import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";
import { DataService } from "../../core/services/data.service";
import { finalize, map, takeUntil } from "rxjs/operators";
import { Subject, Subscription, Observable } from "rxjs";
import { CustomTable } from "./custom-table.interface";
import { Router, Route, ActivatedRoute } from "@angular/router";
import { AuthService } from "../../core/auth/auth.service";
import { environment } from "../../../environments/environment";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";
import * as CryptoJS from "crypto-js";
import { StorageService } from "../../core/services/storage.service";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { ExcelService } from "../../core/services/excel.service";
import { BlockUI, NgBlockUI } from "ng-block-ui";
import { MatDialog } from "@angular/material/dialog";
import { DialogFilterBuilder } from "./dialog-filter-builder/dialog-filter-builder.componet";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../shared/types/common";
import swal from "sweetalert2";

const asyncFilter = async (arr, predicate) =>
  Promise.all(arr.map(predicate)).then((results) =>
    arr.filter((_v, index) => results[index])
  );

@Component({
  selector: "app-custom-table",
  templateUrl: "./custom-table.component.html",
  styleUrls: ["./custom-table.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class CustomTableComponent implements OnInit {
  @BlockUI() blockUI: NgBlockUI;

  @Input() listData: CustomTable;

  private eventsLoad: Subscription;

  @Input() events: Observable<void>;

  isScreenSmall: boolean;
  length = 100;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  isLoadingTable = true;
  where = "";
  order = "";
  where_in = [];

  @Output("change") sizeChange = new EventEmitter<number>();
  @Output("dialogData") dialogData = new EventEmitter<any>();

  filter = {
    field: null,
    filter: null,
    data: null,
  };
  filterByChange = new Subject<string>();

  // feeder var
  blockedPanel: boolean = false;
  progress = {
    progress_kirim: 0,
    progress_sukses: 0,
    progress_gagal: 0,
    number_kirim: 0,
    number_sukses: 0,
    number_gagal: 0,
  };
  total_data = 0;
  btn_close = 0;
  rekap_pengiriman: any[] = [];
  view_detail = false;

  allComplete: boolean = false;
  itemSelected = 0;
  filterHeader = false;
  constructor(
    public breakpointObserver: BreakpointObserver,
    private dataService: DataService,
    private router: Router,
    private _authService: AuthService,
    private _storageService: StorageService,
    private excelService: ExcelService,
    public dialog: MatDialog
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
        } else {
          this.isScreenSmall = false;
        }
      });

    this.filterByChange.pipe(debounceTime(1500)).subscribe(() => {
      if (
        this.filter.data.filter_type == "text" &&
        this.filter.filter.length < 2
      ) {
        if (this.filter.filter == "") {
          for (let i = 0; i < this.listData.header.length; i++) {
            if (
              this.listData.header[i].field == this.filter.field &&
              this.listData.header[i].filter_value == ""
            ) {
              this.loadData(0, "", "", this.listData.type);
            }
          }
        }
        return true;
      }

      for (let i = 0; i < this.listData.header.length; i++) {
        if (this.listData.header[i].field != this.filter.field) {
          this.listData.header[i].filter_value = null;
        }
      }

      if (this.filter.filter == "") {
        for (let i = 0; i < this.listData.header.length; i++) {
          if (
            this.listData.header[i].field == this.filter.field &&
            this.listData.header[i].filter_value == ""
          ) {
            this.loadData(0, "", "", this.listData.type);
          }
        }
        return true;
      }

      let where = this.filter.field + " like '%" + this.filter.filter + "%'";

      let endpointHistoriHeader = [
        {
          field: this.filter.field,
          value: this.filter.filter,
          endpoint: this.listData.endpoint,
        },
      ];
      this._storageService.set("hsiotyr_header", endpointHistoriHeader);
      this.loadData(0, where, "", "filter");
    });
  }

  ngOnInit() {
    this.eventsLoad = this.events.subscribe(() => this.initData());
    this.initData();
  }

  async initData(): Promise<any> {
    this.isLoadingTable = false;

    if (typeof this.listData.pageSize !== "undefined") {
      this.pageSize = this.listData.pageSize;
    }

    const request = [this.getHistoryFilter()];
    const [history] = await Promise.all(request);

    if (this.listData.init_load && !this.listData.is_role) {
      this.loadData(0, this.where, this.order, this.listData.type);
    }

    if (this.listData.is_role) {
      this.loadDataRole();
    } else {
      if (this.listData.filter_data.length > 0) {
        this.loadInitialData();
      }
    }
  }

  getHistoryFilter(): any {
    let hsiotyr_encryp = this._storageService.get("hsiotyr");

    if (hsiotyr_encryp) {
      var historyDecryp = hsiotyr_encryp;
      var filter_history = historyDecryp;

      for (let i = 0; i < filter_history.length; i++) {
        let index = this.listData.filter_data
          .map(function (e) {
            return e.api.endpoint;
          })
          .indexOf(filter_history[i].endpoint);

        if (index != -1) {
          this.listData.filter_data[index].value = filter_history[i].value;
          this.changeListData(
            this.listData.filter_data[index].value,
            this.listData.filter_data[index]
          );
        }
      }
    }

    let hsiotyr_header_encryp = this._storageService.get("hsiotyr_header");

    if (hsiotyr_header_encryp) {
      var historyHeaderDecryp = hsiotyr_header_encryp;
      var filter_header_history = historyHeaderDecryp;

      for (let i = 0; i < filter_header_history.length; i++) {
        if (this.listData.endpoint == filter_header_history[i].endpoint) {
          let index = this.listData.header
            .map(function (e) {
              return e.field;
            })
            .indexOf(filter_header_history[i].field);

          if (index != -1) {
            this.listData.header[index].filter_value =
              filter_header_history[i].value;
            this.filterHeader = true;

            this.setFilterBy(
              filter_header_history[i].field,
              filter_header_history[i].value,
              this.listData.header[index]
            );
            return false;
          }
        }
      }
    }

    return true;
  }

  clearFilter() {
    for (let i = 0; i < this.listData.filter_data.length; i++) {
      this.listData.filter_data[i].value = "";
    }

    for (let i = 0; i < this.listData.header.length; i++) {
      this.listData.header[i].filter_value = "";
    }

    this.loadData(0, "", "", this.listData.type);
    this._storageService.remove("hsiotyr_header");
  }

  async loadDataRole(): Promise<any> {
    const request = [this._authService.getRole()];
    const [role] = await Promise.all(request);

    this.where_in = [];

    let where = "";

    let prodi_role = role.prodi.split(",");

    for (let i = 0; i < prodi_role.length; i++) {
      this.where_in.push(prodi_role[i]);
    }

    if (this.listData.filter_data.length > 0) {
      this.loadInitialData();
    }

    if (this.listData.init_load) {
      if (prodi_role.length > 0) {
        let hsiotyr_encryp = this._storageService.get("hsiotyr");
        if (hsiotyr_encryp) {
          var historyDecryp = hsiotyr_encryp;
          var filter_history = historyDecryp;

          let index = filter_history
            .map(function (e) {
              return e.endpoint;
            })
            .indexOf("/master/prodi");

          if (index != -1) {
            if (
              !this.listData.filter_data[index].value &&
              this.listData.filter_data[index].value == ""
            ) {
              where =
                this.listData.is_role_params.prodi +
                "= '" +
                prodi_role[0] +
                "' ";
            }
          }
        } else {
          where =
            this.listData.is_role_params.prodi + "= '" + prodi_role[0] + "' ";
        }
      }

      this.loadTable(where);
    }
  }

  loadTable(where) {
    let data = this.listData.header.filter(function (el) {
      return el.filter_value != null && el.filter_value != "";
    });

    if (data.length > 0) {
      this.filter = {
        field: data[0].field,
        filter: data[0].filter_value,
        data: data[0],
      };
      // this.where = where;
      this.filterByChange.next();
    } else {
      this.loadData(0, this.where, this.order, "filter");
    }
  }

  onChangePaginator(event: PageEvent): void {
    //console.log(event);
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    this.loadData(
      event.pageIndex + 1,
      this.where,
      this.order,
      this.listData.type
    );
  }

  loadData(page: number, where, order, type): void {
    //console.log(where);
    // this.where = where;
    this.listData.type = type;
    this.clearDataDynamic();

    if (type == "order") {
      this.order = order;
    } else if (type == "filter") {
      if (this.listData.where != "") {
        if (where != "") {
          this.where = this.listData.where + " AND " + where;
        } else {
          this.where = this.listData.where;
        }
      } else {
        this.where = where;
      }
      var endpointHistori = [];

      if (this.listData.filter_data.length) {
        var where_filter = "";
        for (let i = 0; i < this.listData.filter_data.length; i++) {
          if (
            this.listData.filter_data[i].value &&
            this.listData.filter_data[i].value != "" &&
            this.listData.filter_data[i].is_filter == true
          ) {
            if (where_filter != "") {
              where_filter +=
                " AND " +
                this.listData.filter_data[i].id +
                " = '" +
                this.listData.filter_data[i].value +
                "'";
            } else {
              where_filter +=
                this.listData.filter_data[i].id +
                " = '" +
                this.listData.filter_data[i].value +
                "'";
            }
          }

          endpointHistori.push({
            index: i,
            value: this.listData.filter_data[i].value,
            endpoint: this.listData.filter_data[i].api.endpoint,
          });
        }

        this._storageService.set("hsiotyr", endpointHistori);

        this.where +=
          this.where != ""
            ? where_filter != ""
              ? " AND " + where_filter
              : where_filter
            : where_filter;
      }
      if (this.where_in.length > 0) {
        if (this.where != "") {
          this.where +=
            " AND " +
            this.listData.is_role_params.prodi +
            " IN (" +
            this.where_in.join(",") +
            ")";
        } else {
          this.where +=
            this.listData.is_role_params.prodi +
            " IN (" +
            this.where_in.join(",") +
            ")";
        }
      }

      this.order = this.listData.order;
    }

    if (typeof this.listData.filter_builder_data !== "undefined") {
      this.where = this.listData.where;
      for (let i = 0; i < this.listData.filter_builder_data.length; i++) {
        if (this.listData.filter_builder_data[i].field) {
          if (this.listData.filter_builder_data[i].type == "--") {
            if (this.where == "") {
              this.where +=
                " " +
                this.listData.filter_builder_data[i].field.field +
                " BETWEEN '" +
                this.listData.filter_builder_data[i].value_1 +
                "' AND '" +
                this.listData.filter_builder_data[i].value_2 +
                "'";
            } else {
              this.where +=
                " AND " +
                this.listData.filter_builder_data[i].field.field +
                " BETWEEN '" +
                this.listData.filter_builder_data[i].value_1 +
                "' AND '" +
                this.listData.filter_builder_data[i].value_2 +
                "'";
            }
          } else {
            if (this.where == "") {
              this.where +=
                " " +
                this.listData.filter_builder_data[i].field.field +
                this.listData.filter_builder_data[i].type +
                " '" +
                this.listData.filter_builder_data[i].value_1 +
                "'";
            } else {
              this.where +=
                " AND " +
                this.listData.filter_builder_data[i].field.field +
                this.listData.filter_builder_data[i].type +
                " '" +
                this.listData.filter_builder_data[i].value_1 +
                "'";
            }
          }
        }
      }
    }

    if (typeof this.listData.where_param !== "undefined") {
      for (let i = 0; i < this.listData.where_param.length; i++) {
        let value_params = "";

        if (this.listData.where_param[i].type == "local") {
          value_params = this._storageService.get(
            this.listData.where_param[i].value
          );
        } else {
          value_params = this.listData.where_param[i].value;
        }

        if (this.where == "") {
          this.where +=
            " " +
            this.listData.where_param[i].field +
            " = '" +
            value_params +
            "'";
        } else {
          this.where +=
            " AND " +
            this.listData.where_param[i].field +
            " = '" +
            value_params +
            "'";
        }
      }
    }
    if (this.listData.is_where) {
      this.where += this.listData.where;
      this.order += this.listData.order;
    }

    this.isLoadingTable = true;
    // this.dataService
    //   .getPostRequest<any>(this.listData.endpoint, {
    //     offset: page,
    //     limit: this.pageSize,
    //     order: this.order,
    //     where: this.where,
    //     group: this.listData.group,
    //   })
    this.dataService
      .getPostRequestLocal<any>(
        this.listData.hasOwnProperty("endpoint_local")
          ? "/" + this.listData.endpoint_local
          : "",
        {
          action: this.listData.endpoint,
          offset: page > 0 ? (page - 1) * this.pageSize : 0,
          limit: this.pageSize,
          order: this.listData.order,
          where: this.where,
          group: this.listData.group,
        }
      )
      .pipe(
        map((response) => response),
        finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
      )
      .subscribe(
        (response) => {
          this.where = "";
          this.length = response.jumlah_data;
          var pageString = "5,10,25,100";

          this.setPageSizeOptions(pageString + "," + this.length);

          if (
            this.listData.dynamic_header_field != "" &&
            this.listData.dynamic_header_type != "" &&
            response.result.length > 0
          ) {
            let header_dynamic = [];
            if (this.listData.dynamic_header_type == "string") {
              header_dynamic = JSON.parse(
                "[" +
                  response.result[0][this.listData.dynamic_header_field] +
                  "]"
              );

              if (!response.result[0][this.listData.dynamic_header_field]) {
                header_dynamic = [];
              }
              let start_index = this.listData.dynamic_header_add_index;
              for (let j = 0; j < header_dynamic.length; j++) {
                this.listData.header.splice(start_index, 0, {
                  type: "dynamic",
                  label: header_dynamic[j][this.listData.dynamic_header_name],
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400",
                  field: this.listData.dynamic_header_name + (j + 1),
                  filter: null,
                  filter_type: "text",
                  filter_value: null,
                  sort: null,
                  sort_type: "",
                  data: [],
                });

                this.listData.field.splice(start_index, 0, {
                  type: "dynamic",
                  count_field: [],
                  class: "text-center border border-black-300",
                  field: this.listData.dynamic_header_name + (j + 1),
                });

                start_index++;
              }
            }

            var header = [];
            for (let i = 0; i < response.result.length; i++) {
              var obj = response.result[i];

              let header_dynamic = [];
              if (this.listData.dynamic_header_type == "string") {
                header_dynamic = JSON.parse(
                  "[" +
                    response.result[i][this.listData.dynamic_header_field] +
                    "]"
                );
              }

              if (!response.result[i][this.listData.dynamic_header_field]) {
                header_dynamic = [];
              }

              for (let j = 0; j < header_dynamic.length; j++) {
                obj[this.listData.dynamic_header_name + (j + 1)] = {
                  label: header_dynamic[j][this.listData.dynamic_header_name],
                  value: header_dynamic[j][this.listData.dynamic_header_value],
                };
              }

              header.push(obj);
            }
          }

          for (let i = 0; i < this.listData.field.length; i++) {
            if (this.listData.field[i].type == "sum") {
              for (let j = 0; j < response.result.length; j++) {
                response.result[j][this.listData.field[i].field] = 0;
                for (
                  let k = 0;
                  k < this.listData.field[i].count_field.length;
                  k++
                ) {
                  response.result[j][this.listData.field[i].field] +=
                    response.result[j][this.listData.field[i].count_field[k]];
                }
              }
            }
          }

          this.listData.data = response.result;

          if (typeof this.listData.sum !== "undefined") {
            if (this.listData.sum.length > 0) {
              for (let i = 0; i < this.listData.sum.length; i++) {
                if (this.listData.sum[i].label == "") {
                  this.listData.sum[i].value = response.result.reduce(
                    (a, b) => a + b[this.listData.sum[i].field],
                    0
                  );
                }
              }
            }
          }

          if (typeof this.listData.feeder !== "undefined") {
            this.total_data = response.jumlah_data;
            for (let i = 0; i < this.listData.feeder.length; i++) {
              this.listData.feeder[i].number_process = response.data_dikirim;
            }
            this.rekap_pengiriman = response.rekap_pengiriman;
          }
        },
        (error) => {
          this.where = "";
          console.log(error);
        }
      );
  }

  setSortBy(field, type, data) {
    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].field != field) {
        this.listData.header[i].sort_type = "";
      }
    }

    data.sort_type = type;

    let order = field + " " + type;

    if (type == "") {
      order = "";
    }

    this.loadData(0, "", order, "order");
  }

  setFilterBy(field, filter, data) {
    this.filter = {
      field: field,
      filter: filter,
      data: data,
    };

    this.filterByChange.next();
  }

  async loadInitialData(): Promise<any> {
    try {
      let filter = [];
      let request = [];
      let response = [];

      for (let i = 0; i < this.listData.filter_data.length; i++) {
        if (
          this.listData.filter_data[i].api &&
          !this.listData.filter_data[i].trigger
        ) {
          filter.push({
            index: i,
            data: this.listData.filter_data[i],
          });
        }
      }

      for (let i = 0; i < filter.length; i++) {
        if (filter[i].data.api.hasOwnProperty("prodi_role")) {
          if (filter[i].data.api.prodi_role.is_role) {
            if (filter[i].data.api.where != "") {
              filter[i].data.api.where =
                filter[i].data.api.where +
                " AND " +
                filter[i].data.api.prodi_role.param +
                " IN (" +
                this.where_in.join(",") +
                ")";
            } else {
              filter[i].data.api.where =
                filter[i].data.api.prodi_role.param +
                " IN (" +
                this.where_in.join(",") +
                ")";
            }
          }
        }

        request.push(
          this.loadListData(
            filter[i].data.api.endpoint,
            filter[i].data.api.where
          )
        );
        response.push(filter[i].data.id);
      }

      response = await Promise.all(request);

      for (let i = 0; i < filter.length; i++) {
        filter[i].data.data_list = [];
        for (let j = 0; j < response[i].result.length; j++) {
          let label = response[i].result[j][filter[i].data.api.label];

          if (typeof filter[i].data.concat !== "undefined") {
            if (filter[i].data.concat.length > 0) {
              label = "";
            }
            for (let l = 0; l < filter[i].data.concat.length; l++) {
              if (filter[i].data.concat[l].type == "value") {
                label += response[i].result[j][filter[i].data.concat[l].field];
              } else {
                label += filter[i].data.concat[l].field;
              }
            }
          }

          filter[i].data.data_list.push({
            id: response[i].result[j][filter[i].data.api.id],
            label: label,
          });
        }

        this.listData.filter_data[filter[i].index].data_list =
          filter[i].data.data_list;

        if (
          typeof this.listData.filter_data[filter[i].index]
            .first_index_selected !== "undefined"
        ) {
          if (
            !this.listData.filter_data[filter[i].index].value &&
            this.listData.filter_data[filter[i].index].value != ""
          ) {
            if (
              this.listData.filter_data[filter[i].index].first_index_selected
            ) {
              this.listData.filter_data[filter[i].index].value =
                this.listData.filter_data[filter[i].index].data_list.length > 0
                  ? this.listData.filter_data[filter[i].index].data_list[0].id
                  : null;
            }
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  loadListData(endpoint, where): Promise<any> {
    return this.dataService
      .getRequest<any>(endpoint, {
        where: where,
      })
      .toPromise();
  }

  changeListData(value, data) {
    let index = this.listData.filter_data
      .map(function (e) {
        return e.id;
      })
      .indexOf(data.trigger_id);

    if (index != -1) {
      this.dataService
        .getPostRequest<any>(this.listData.filter_data[index].api.endpoint, {
          where:
            this.listData.filter_data[index].api.where != ""
              ? this.listData.filter_data[index].api.where +
                " AND " +
                this.listData.filter_data[index].trigger_params +
                "='" +
                value +
                "'"
              : this.listData.filter_data[index].trigger_params +
                "='" +
                value +
                "'",
        })
        .pipe(
          map((response) => response),
          finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
        )
        .subscribe(
          (response) => {
            this.listData.filter_data[index].data_list = [];
            for (let j = 0; j < response.result.length; j++) {
              let label =
                response.result[j][this.listData.filter_data[index].api.label];

              if (
                typeof this.listData.filter_data[index].api.concat !==
                "undefined"
              ) {
                if (this.listData.filter_data[index].api.concat.length > 0) {
                  label = "";
                }
                for (
                  let l = 0;
                  l < this.listData.filter_data[index].api.concat.length;
                  l++
                ) {
                  if (
                    this.listData.filter_data[index].api.concat[l].type ==
                    "value"
                  ) {
                    label +=
                      response.result[j][
                        this.listData.filter_data[index].api.concat[l].field
                      ];
                  } else {
                    label +=
                      this.listData.filter_data[index].api.concat[l].field;
                  }
                }
              }

              this.listData.filter_data[index].data_list.push({
                id: response.result[j][this.listData.filter_data[index].api.id],
                label: label,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  actions(i, data, action) {
    if (action.type == "route") {
      this.toRoute(data, action);
    } else if (action.type == "dialog") {
      this.dialogData.emit({
        data: data,
        controller: action.controller,
      });
    }
  }
  addDataDetail(data, action) {
    console.log("data", data);
    console.log("selected", action);
    if (action.type == "route") {
      this.toRoute(data, action);
    } else if (action.type == "dialog") {
      this.dialogData.emit({
        data: data,
        controller: action.controller,
      });
    }
  }
  addData(action) {
    // console.log(action);
    if (action.type == "route") {
      this.router.navigate([action.route]);
    } else if (action.type == "dialog") {
      this.dialogData.emit({
        data: null,
        controller: action.controller,
      });
    }
  }

  toRoute(data, action) {
    this.router.navigate([action.route + "/" + data[action.id_params]]);
  }

  clearDataDynamic() {
    this.listData.header = this.listData.header.filter(function (data) {
      return data.type != "dynamic";
    });

    this.listData.field = this.listData.field.filter(function (data) {
      return data.type != "dynamic";
    });
  }

  download(path) {
    //window.open(environment.baseUrlDoc + path, "_blank");
    window.open(path, "_blank");
    //console.log(path);
  }

  toHome() {
    if (this.view_detail) {
      this.view_detail = !this.view_detail;
      this.listData.data = this.listData.temp;
    } else {
      var home = this._storageService.get("home");

      if (home) {
        this.router.navigate([home]);
      }
    }
  }

  toMaster() {
    if (this.view_detail) {
      this.view_detail = !this.view_detail;
      this.listData.data = this.listData.temp;
    } else {
      var menu_master = this._storageService.get("path_menu_master");

      if (menu_master) {
        this.router.navigate([menu_master]);
        this._storageService.remove("path_menu_master");
      }
    }
  }

  exportDataCsv(data_action) {
    var rows = [];
    var header = [];

    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].label != "#") {
        header.push(this.listData.header[i].label);
      } else {
        header.push("No.");
      }
    }
    rows.push(header);
    for (let i = 0; i < this.listData.data.length; i++) {
      var data = [];
      for (let j = 0; j < this.listData.field.length; j++) {
        if (this.listData.field[j].field == "no") {
          data.push(i + 1);
        } else {
          data.push(this.listData.data[i][this.listData.field[j].field]);
        }
      }
      rows.push(data);
    }
    var sum = [];
    if (typeof this.listData.sum !== "undefined") {
      for (let i = 0; i < this.listData.sum.length; i++) {
        if (parseInt(this.listData.sum[i].colspan) > 1) {
          for (let j = 0; j < parseInt(this.listData.sum[i].colspan); j++) {
            if (parseInt(this.listData.sum[i].colspan) - 1 != j) {
              sum.push("");
            } else {
              sum.push(this.listData.sum[i].label);
            }
          }
        } else {
          sum.push(this.listData.sum[i].value);
        }
      }
    }

    rows.push(sum);

    var csvContent = "data:text/csv;charset=utf-8,";
    rows.forEach(function (rowArray) {
      var row = rowArray.join(",");
      csvContent += row + "\r\n";
    });

    var today = new Date();

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      today.getDate() +
        "-" +
        today.getMonth() +
        "-" +
        today.getFullYear() +
        " - " +
        data_action.label_report +
        ".csv"
    );
    document.body.appendChild(link);
    link.click();
  }

  exportDataPdf(data_action) {
    // const doc = new jsPDF("l", "mm", "a4");
    let doc = new jsPDF({ orientation: "l" });
    autoTable(doc, { html: "#table-custom" });

    const addFooters = (doc) => {
      // console.log(9070967);
      const pageCount = doc.internal.getNumberOfPages();

      doc.setFontSize(8);
      for (var i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        var today = new Date();
        var newdat = "Date Printed : " + today;
        doc.text(107, 200, newdat);
      }
    };

    addFooters(doc);
    var today = new Date();

    doc.save(
      today.getDate() +
        "-" +
        today.getMonth() +
        "-" +
        today.getFullYear() +
        " - " +
        data_action.label_report +
        ".pdf"
    );
  }

  exportData(data) {
    if (data.type == "csv") {
      this.exportDataCsv(data);
    } else if (data.type == "pdf") {
      this.exportDataPdf(data);
    } else if (data.type == "excel") {
      this.exportAsXLSX(data);
    }
  }

  dataOfFootballers: any = [
    {
      playerName: "Cristiano Ronaldo",
      playerCountry: "Pourtgal",
      playerClub: "Juventus",
    },
    {
      playerName: "Lionel Messi",
      playerCountry: "Argentina",
      playerClub: "Barcelona",
    },
    {
      playerName: "Neymar Junior",
      playerCountry: "Brazil",
      playerClub: "PSG",
    },
    {
      playerName: "Tonni Kroos",
      playerCountry: "Germany",
      playerClub: "Real Madrid",
    },
    {
      playerName: "Paul Pogba",
      playerCountry: "France",
      playerClub: "Manchester United",
    },
  ];

  exportAsXLSX(data_action): void {
    var rows = [];
    var header = [];

    for (let i = 0; i < this.listData.header.length; i++) {
      if (this.listData.header[i].label != "#") {
        header.push(this.listData.header[i].label);
      } else {
        header.push("No.");
      }
    }
    // rows.push(header);
    for (let i = 0; i < this.listData.data.length; i++) {
      var data = [];
      for (let j = 0; j < this.listData.field.length; j++) {
        if (this.listData.field[j].field == "no") {
          data.push(i + 1);
        } else {
          data.push(this.listData.data[i][this.listData.field[j].field]);
        }
      }

      var json = {};
      for (let j = 0; j < data.length; j++) {
        json[header[j].toString()] = data[j];
      }

      rows.push(json);
    }

    var sum = [];
    if (typeof this.listData.sum !== "undefined") {
      for (let i = 0; i < this.listData.sum.length; i++) {
        if (parseInt(this.listData.sum[i].colspan) > 1) {
          for (let j = 0; j < parseInt(this.listData.sum[i].colspan); j++) {
            if (parseInt(this.listData.sum[i].colspan) - 1 != j) {
              sum.push("");
            } else {
              sum.push(this.listData.sum[i].label);
            }
          }
        } else {
          sum.push(this.listData.sum[i].value);
        }
      }
    }

    var json = {};
    for (let j = 0; j < sum.length; j++) {
      json[header[j].toString()] = sum[j];
    }

    rows.push(json);
    var today = new Date();
    var newdat = "Date Printed : " + today;
    var jsons = {};
    // for (let i = 0; i < 10; i++) {
    //   rows.push(json);
    // }
    jsons[header[0].toString()] = newdat;

    rows.push(jsons);

    this.excelService.exportAsExcelFile(
      rows,
      today.getDate() +
        "-" +
        today.getMonth() +
        "-" +
        today.getFullYear() +
        " - " +
        data_action.label_report
    );
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput
        .split(",")
        .map((str) => +str);
    }
  }

  synch(feeder) {
    this.blockUI.start("Loading..."); // Start blocking
    this.progress = {
      progress_kirim: 0,
      progress_sukses: 0,
      progress_gagal: 0,
      number_kirim: 0,
      number_sukses: 0,
      number_gagal: 0,
    };
    this.loadDataFeeder(
      this.total_data / feeder.number_process,
      feeder.number_process
    );
  }

  async loadDataFeeder(jum_iterasi, number_process): Promise<any> {
    try {
      let request = [];
      let response = [];
      var process = 0;
      for (let i = 0; i < jum_iterasi; i++) {
        process += number_process;
        request.push(this.prosessFeeder(jum_iterasi, number_process, process));
      }

      response = await Promise.all(request);

      // var listDataKelompok = listKelompok.result;
      // this._authService.setKelompok(listDataKelompok);
      // let route_dashboard = "/pmb/dashboard-pmb-adm";
    } catch (error) {
      console.log(error);
    }
  }

  async prosessFeeder(jum_iterasi, number_process, process): Promise<any> {
    try {
      //console.log(jum_iterasi, number_process, process);
      let request = [this.endpointFeeder(jum_iterasi, number_process, process)];

      let response = await Promise.all(request);
      //console.log(response);
      this.progress = {
        progress_kirim: (response[0].kirim / this.total_data) * 100,
        progress_sukses: (response[0].sukses / this.total_data) * 100,
        progress_gagal: (response[0].gagal / this.total_data) * 100,
        number_kirim: response[0].kirim,
        number_sukses: response[0].sukses,
        number_gagal: response[0].gagal,
      };

      if (this.progress.progress_kirim == 100) {
        this.closeBlockUi();
      }
    } catch (error) {
      console.log(error);
    }
  }

  endpointFeeder(jum_iterasi, number_process, process): Promise<any> {
    return this.dataService
      .getPostRequestLocal<any>("/feeder", {
        jum_iterasi: jum_iterasi,
        number_process: number_process,
        process: process,
      })
      .toPromise();
  }

  closeBlockUi() {
    setTimeout(() => {
      this.blockUI.stop(); // Stop blocking

      swal
        .fire({
          title: "<strong>Hasil Pengiriman</strong>",
          icon: "info",
          html:
            '<table class="simple with-toolbar bordered stripped">' +
            '<thead id="table-custom-header">' +
            "<tr>" +
            "<td>Status</td>" +
            "<td>Jumlah Data</td>" +
            "<td>Progress</td>" +
            "</tr></thead>" +
            '<tbody id="table-custom-data"><tr>' +
            "<td>Data Kirim</td>" +
            '<td class="text-center">' +
            this.progress.number_kirim +
            "/" +
            this.total_data +
            "</td>" +
            '<td class="text-center">' +
            this.progress.progress_kirim +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Data Sukses</td>" +
            '<td class="text-center">' +
            this.progress.number_sukses +
            "/" +
            this.total_data +
            "</td>" +
            '<td class="text-center">' +
            this.progress.progress_sukses +
            "</td>" +
            "</tr>" +
            "<tr>" +
            "<td>Data Gagal</td>" +
            '<td class="text-center">' +
            this.progress.number_gagal +
            "/" +
            this.total_data +
            "</td>" +
            '<td class="text-center">' +
            this.progress.progress_gagal +
            "</td>" +
            "</tr></tbody>" +
            "</table>",
          showCancelButton: false,
          confirmButtonText: "Oke",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.loadData(0, this.where, this.order, this.listData.type);
          }
        });
    }, 2000);
  }

  filterBuilder() {
    const dialogRef = this.dialog.open(DialogFilterBuilder, {
      width: "50vw",
      data: this.listData,
    });

    dialogRef.afterClosed().subscribe((response) => {
      //console.log(response);
      this.listData = response.data;
      this.initData();
    });
  }

  expandAll() {}

  expand(data, expand_data) {
    if (typeof data.expand !== "undefined") {
      data.expand = !data.expand;
    } else {
      data.expand = true;
    }

    if (data.expand) {
      this.view_detail = true;
      this.listData.temp = this.listData.data;
      this.listData.data = [];
      this.listData.data.push(data);
      this.loadDataExpand(0, "", "", "", this.listData.expand_data.list[0]);
    }
  }

  onTabChangedExpand(e) {
    this.loadDataExpand(0, "", "", "", this.listData.expand_data.list[e.index]);
  }

  loadDataExpand(page: number, where, order, type, dataExpand): void {
    dataExpand.data.where =
      dataExpand.params_set +
      "= '" +
      this.listData.data[0][dataExpand.params_get] +
      "'";
    dataExpand.data.type = type;
    //console.log(dataExpand);

    this.isLoadingTable = true;
    this.dataService
      .getPostRequestLocal<any>(
        dataExpand.data.hasOwnProperty("endpoint_local")
          ? "/" + dataExpand.data.endpoint_local
          : "",
        {
          action: dataExpand.data.endpoint,
          offset: page > 0 ? (page - 1) * this.pageSize : 0,
          limit: this.pageSize,
          order: dataExpand.data.order,
          where: dataExpand.data.where,
          group: dataExpand.data.group,
        }
      )
      .pipe(
        map((response) => response),
        finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
      )
      .subscribe(
        (response) => {
          this.length = response.jumlah_data;
          var pageString = "5,10,25,100";

          this.setPageSizeOptions(pageString + "," + this.length);

          if (
            dataExpand.data.dynamic_header_field != "" &&
            dataExpand.data.dynamic_header_type != "" &&
            response.result.length > 0
          ) {
            let header_dynamic = [];
            if (dataExpand.data.dynamic_header_type == "string") {
              header_dynamic = JSON.parse(
                "[" +
                  response.result[0][dataExpand.data.dynamic_header_field] +
                  "]"
              );

              if (!response.result[0][dataExpand.data.dynamic_header_field]) {
                header_dynamic = [];
              }
              let start_index = dataExpand.data.dynamic_header_add_index;
              for (let j = 0; j < header_dynamic.length; j++) {
                dataExpand.data.header.splice(start_index, 0, {
                  type: "dynamic",
                  label: header_dynamic[j][dataExpand.data.dynamic_header_name],
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400",
                  field: dataExpand.data.dynamic_header_name + (j + 1),
                  filter: null,
                  filter_type: "text",
                  filter_value: null,
                  sort: null,
                  sort_type: "",
                  data: [],
                });

                dataExpand.data.field.splice(start_index, 0, {
                  type: "dynamic",
                  count_field: [],
                  class: "text-center border border-black-300",
                  field: dataExpand.data.dynamic_header_name + (j + 1),
                });

                start_index++;
              }
            }

            var header = [];
            for (let i = 0; i < response.result.length; i++) {
              var obj = response.result[i];

              let header_dynamic = [];
              if (dataExpand.data.dynamic_header_type == "string") {
                header_dynamic = JSON.parse(
                  "[" +
                    response.result[i][dataExpand.data.dynamic_header_field] +
                    "]"
                );
              }

              if (!response.result[i][dataExpand.data.dynamic_header_field]) {
                header_dynamic = [];
              }

              for (let j = 0; j < header_dynamic.length; j++) {
                obj[dataExpand.data.dynamic_header_name + (j + 1)] = {
                  label: header_dynamic[j][dataExpand.data.dynamic_header_name],
                  value:
                    header_dynamic[j][dataExpand.data.dynamic_header_value],
                };
              }

              header.push(obj);
            }
          }

          for (let i = 0; i < dataExpand.data.field.length; i++) {
            if (dataExpand.data.field[i].type == "sum") {
              for (let j = 0; j < response.result.length; j++) {
                response.result[j][dataExpand.data.field[i].field] = 0;
                for (
                  let k = 0;
                  k < dataExpand.data.field[i].count_field.length;
                  k++
                ) {
                  response.result[j][dataExpand.data.field[i].field] +=
                    response.result[j][dataExpand.data.field[i].count_field[k]];
                }
              }
            }
          }

          dataExpand.data.data = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }

  checkAll(check: boolean) {
    this.allComplete = check;
    if (this.listData.data == null) {
      return;
    }
    this.listData.data.forEach((t) => (t.check = check));
  }

  checkList() {
    this.allComplete =
      this.listData.data != null && this.listData.data.every((t) => t.check);
  }

  checkComplete(): boolean {
    if (this.listData.data == null) {
      return false;
    }

    this.itemSelected = this.listData.data.filter((t) => t.check).length;

    return (
      this.listData.data.filter((t) => t.check).length > 0 && !this.allComplete
    );
  }

  exeActionSelected(action_selected) {
    swal
      .fire({
        title: action_selected.label,
        text: "Apakah Yakin Akan " + action_selected.label + " Ini?",
        icon: "warning",
        showCancelButton: true,
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        confirmButtonText: "Ya",
        cancelButtonText: "Batal",
        buttonsStyling: false,
      })
      .then((result) => {
        if (result.value) {
          //this.submitActionSelected(action_selected);
          this.submitActionProses(action_selected);
        }
      });
  }

  submitActionProses(action_selected): void {
    let data = this.listData.data.filter((t) => t.check);
    // console.log("proses", action_selected);
    // for (let i = 0; i < data.length; i++) {
    //   let payload = {};
    // }
    this.addDataDetail(data, action_selected);
    // console.log("data cutome", data);
  }

  submitActionSelected(action_selected): void {
    let data = this.listData.data.filter((t) => t.check);

    for (let i = 0; i < data.length; i++) {
      let payload = {
        action: action_selected.api.endpoint,
        id: data[i][action_selected.id_params],
      };
      let endpoint = "";

      this.dataService
        .getPostRequestLocal<FormResponse>(endpoint, payload)
        .subscribe(
          (success) => {
            if (i == data.length - 1) {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: action_selected.label,
                  text: action_selected.label + " Gagal di Proses.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: action_selected.label,
                    text: action_selected.label + " Berhasil di Simpan.",
                    icon: "success",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                  })
                  .then((result) => {
                    this.ngOnInit();
                  });
              }
            }
          },
          (error) => {
            if (i == data.length - 1) {
              swal.fire({
                title: action_selected.label,
                text: action_selected.label + " Gagal di Proses.",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            }
          }
        );
    }
  }

  showActionTable(action, item) {
    //console.log(item);
    if (typeof action.condition != "undefined") {
      for (let i = 0; i < action.condition.length; i++) {
        if (action.condition[i].operator == "!=") {
          if (
            item[action.condition[i].params_1] != action.condition[i].params_2
          ) {
            // return true;
          } else {
            return false;
          }
        }

        if (action.condition[i].operator == "==") {
          if (
            item[action.condition[i].params_1] == action.condition[i].params_2
          ) {
            // return true;
          } else {
            return false;
          }
        }
      }
    }

    return true;
  }
}
