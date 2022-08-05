import { Component, OnInit } from "@angular/core";

import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { finalize, map, takeUntil } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogDeleteComponent } from "../form-dialog-delete/form-dialog-delete.component";
import { NgxSpinnerService } from "ngx-spinner";
import { StorageService } from "../../../../core/services/storage.service";

import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from "@angular/forms";

//untuk memanggil base url
import { DataService } from "../../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { CustomTable } from "../../../../components/custom-table/custom-table.interface";

declare const require: any;
declare const $: any;

@Component({
  selector: "app-kriteria-penilaian",
  templateUrl: "./kriteria-penilaian.component.html",
  styleUrls: ["./kriteria-penilaian.component.scss"],
})
export class KriteriaPenilaianComponent implements OnInit {
  listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  FormDialogDeleteComponent = FormDialogDeleteComponent;
  formGroup: FormGroup;
  listDataAuditInternal = [];
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    //ambil base url api
    private dataService: DataService,
    public dialog: MatDialog,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _storageService: StorageService
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log("Matches small viewport or handset in portrait mode");
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }

  ngOnInit() {
    //jalankan function
    this.formGroup = this.formBuilder.group({
      nama_tahun_periode: [{ value: "", disabled: true }],
      nama_audit: [{ value: "", disabled: true }],
      nama_auditor_1: [{ value: "", disabled: true }],
      nama_auditor_2: [{ value: "", disabled: true }],
      nama_auditor_3: [{ value: "", disabled: true }],
      tanggal_audit: [{ value: "", disabled: true }],
      nama_bidang: [{ value: "", disabled: true }],
    });
    this.loadInitialData();
    this.inisialisasiTable();
    this._storageService.set("audit_internal_id", this.params.id);
    this._storageService.set(
      "path_menu_master",
      "pdjama/transaksi/audit-internall"
    );
  }

  async loadInitialData(): Promise<any> {
    try {
      // this.isPreparingForm = true;
      // this.spinnerStatus = "Mohon Tunggu...";
      // this.showSpinner();
      const request = [this.loadDataAuditInternal()];

      const [listDataAuditInternal] = await Promise.all(request);

      this.listDataAuditInternal =
        listDataAuditInternal.result.length > 0
          ? listDataAuditInternal.result[0]
          : false;

      this.inisialisasiDataAuditInternal(this.listDataAuditInternal);
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  deleteData(data) {
    swal
      .fire({
        title: "Hapus Data",
        text: "Apakah Yakin Akan Menghapus Data Ini?",
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
          console.log(result.value);
        }
      });
  }

  inisialisasiTable() {
    this.listData = {
      add_data: {
        id_params: "audit_internal_id",
        type: "route",
        route: "pdjama/transaksi/audit-internall/check-kriteria-penilaian",
      },
      export: [
        {
          type: "csv",
          label: "CSV",
          label_report: "report-ref-jenis-komponen",
        },
        {
          type: "pdf",
          label: "PDF",
          label_report: "report-ref-jenis-komponen",
        },
        {
          type: "excel",
          label: "EXCEL",
          label_report: "report-ref-jenis-komponen",
        },
      ],
      is_action: false,
      is_backMaster: true,
      filter: true,
      init_load: true,
      is_role: false,
      where_param: [
        {
          field: "audit_internal_id",
          value: "audit_internal_id",
          type: "local",
        },
      ],
      is_role_params: {
        prodi: "",
      },
      endpoint: "pdjama/kriteriaAudit",
      action_name: "pdjama/kriteriaAudit",
      type: "",
      order: "",
      where: "",
      group: "",
      pageSize: 5,
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_data: [],
      header: [
        {
          type: "",
          label: "No",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Kode",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-30",
          field: "inisial",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Nama Kriteria",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "nama_kriteria",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aspek Penilaian",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "aspek_penilaian",
          filter: false,
          filter_type: "select",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Aksi",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "actions",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
      ],
      field: [
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "inisial",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300",
          field: "nama_kriteria",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300",
          field: "aspek_penilaian",
        },
        {
          type: "action",
          count_field: [],
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        // {
        //   id_params: "kode",
        //   route: "",
        //   type: "dialog",
        //   controller: "",
        //   toolTip: "Edit Data",
        //   icon: "fa fa-edit text-warning",
        //   condition: [
        //     {
        //       params_1: "kode",
        //       operator: "!=",
        //       params_2: null,
        //     },
        //   ],
        // },
        {
          id_params: "id",
          route: "",
          type: "dialog",
          controller: "",
          toolTip: "Delete Data",
          icon: "fa fa-trash text-danger",
          condition: [
            {
              params_1: "id",
              operator: "!=",
              params_2: null,
            },
          ],
        },
      ],
      data: [],
    };
  }
  dialogData(data) {
    const dialogRef = this.dialog.open(this[data.controller], {
      data: {
        type: data.data,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
      this.loadDataTable();
    });

    console.log(data);
  }

  loadDataAuditInternal(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/auditInternal", {
        where: "id='" + this.params.id + "'",
      })
      .toPromise();
  }

  async inisialisasiDataAuditInternal(data) {
    this.formGroup.get("nama_tahun_periode").setValue(data.nama_tahun_periode);
    this.formGroup.get("nama_audit").setValue(data.nama_audit);
    this.formGroup.get("nama_auditor_1").setValue(data.nama_auditor_1);
    this.formGroup.get("nama_auditor_2").setValue(data.nama_auditor_2);
    this.formGroup.get("nama_auditor_2").setValue(data.nama_auditor_2);
    this.formGroup.get("nama_auditor_3").setValue(data.nama_auditor_3);
    this.formGroup.get("tanggal_audit").setValue(data.tanggal_audit);
    this.formGroup.get("nama_bidang").setValue(data.nama_bidang);
  }
}
