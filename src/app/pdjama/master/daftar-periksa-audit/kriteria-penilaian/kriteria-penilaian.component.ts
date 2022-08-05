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
import { FormDialogKPComponent } from "../kp-form-dialog/kp-form-dialog.component";
import { FormDialogKPDeleteComponent } from "../kp-form-dialog-delete/form-dialog-delete.component";
import { FormDialogKPEditComponent } from "../kp-form-dialog-edit/form-dialog-edit.component";
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
  templateUrl: "kriteria-penilaian.component.html",
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
  FormDialogKPComponent = FormDialogKPComponent;
  FormDialogKPDeleteComponent = FormDialogKPDeleteComponent;
  FormDialogKPEditComponent = FormDialogKPEditComponent;
  formGroup: FormGroup;
  listDataDaftarPeriksa = [];

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
      kode_daftar_periksa_audit: ["", Validators.required],
      kode: ["", Validators.required],
      inisial: ["", Validators.required],
      nama_daftar_periksa: ["", Validators.required],
      deskripsi: ["", Validators.required],
    });
    this.loadInitialData();
    this.inisialisasiTable();
    this._storageService.set("kode_daftar_periksa_audit", this.params.kode);
    this._storageService.set(
      "path_menu_master",
      "pdjama/master/daftar-periksa-audit"
    );
  }

  async loadInitialData(): Promise<any> {
    try {
      // this.isPreparingForm = true;
      // this.spinnerStatus = "Mohon Tunggu...";
      // this.showSpinner();
      const request = [this.loadDataDaftarPeriksa()];

      const [listDataDaftarPeriksa] = await Promise.all(request);

      this.listDataDaftarPeriksa =
        listDataDaftarPeriksa.result.length > 0
          ? listDataDaftarPeriksa.result[0]
          : false;

      this.inisialisasiDataDaftarPeriksa(this.listDataDaftarPeriksa);
      // this.dataPeserta =
      //   dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      // if (this.dataPeserta) {
      //   this.inisialisasiDataFormPeserta(this.dataPeserta);
      // }

      // this.listDataPersyaratan = listDataPersyaratan.result;
      // this.listDataStatusDokumen = listDataStatusDokumen.result;
      // this.hideSpinner();
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
        id_params: "kode_daftar_periksa_audit",
        type: "dialog",
        controller: "FormDialogKPComponent",
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
          field: "kode_daftar_periksa_audit",
          value: "kode_daftar_periksa_audit",
          type: "local",
        },
      ],
      is_role_params: {
        prodi: "",
      },
      endpoint: "pdjama/master/kriteriaPenilaian",
      action_name: "pdjama/master/kriteriaPenilaian",
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
        {
          id_params: "kode",
          route: "",
          type: "dialog",
          controller: "FormDialogKPEditComponent",
          toolTip: "Edit Data",
          icon: "fa fa-edit text-warning",
          condition: [
            {
              params_1: "kode",
              operator: "!=",
              params_2: null,
            },
          ],
        },
        {
          id_params: "kode",
          route: "",
          type: "dialog",
          controller: "FormDialogKPDeleteComponent",
          toolTip: "Delete Data",
          icon: "fa fa-trash text-danger",
          condition: [
            {
              params_1: "kode",
              operator: "!=",
              params_2: null,
            },
          ],
        },
      ],
      data: [],
      expand: false,
      expand_data: {
        list: [
          {
            label: "Kriteria Penilaian",
            params_set: "kode_daftar_periksa_audit", //di isi oleh id detail dari master
            params_get: "kode", //id dari masternya
            data: {
              add_data: {
                id_params: "kode",
                route: "",
                type: "dialog",
                controller: "FormDialogKPComponent",
              },
              is_action: true,
              filter: false,
              init_load: true,
              is_role: false,
              is_role_params: {
                prodi: "",
              },
              endpoint: "pdjama/master/kriteriaPenilaian",
              endpoint_local: "",
              action_name: "",
              type: "",
              order: "",
              where: "",
              group: "",
              dynamic_header_field: "",
              dynamic_header_name: "",
              dynamic_header_value: "",
              dynamic_header_type: "",
              dynamic_header_add_index: 0,
              filter_builder: true,
              filter_data: [],
              header: [
                {
                  type: "",
                  label: "No",
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400 w-20",
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
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400 w-30",
                  field: "inisial",
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: "Nama Kriteria",
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400",
                  field: "nama_kriteria",
                  filter: false,
                  filter_type: "text",
                  filter_value: null,
                  sort: false,
                  sort_type: "",
                  data: [],
                },
                {
                  type: "",
                  label: "Aspek Penilaian",
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400",
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
                  class:
                    "text-sm text-center border border-black-300 bg-gray-400",
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
                {
                  id_params: "kode",
                  route: "",
                  type: "dialog",
                  controller: "FormDialogKPEditComponent",
                  toolTip: "Edit Data",
                  icon: "fa fa-edit text-warning",
                  condition: [
                    {
                      params_1: "kode",
                      operator: "!=",
                      params_2: null,
                    },
                  ],
                },
                {
                  id_params: "kode",
                  route: "",
                  type: "dialog",
                  controller: "FormDialogKPDeleteComponent",
                  toolTip: "Delete Data",
                  icon: "fa fa-trash text-danger",
                  condition: [
                    {
                      params_1: "kode",
                      operator: "!=",
                      params_2: null,
                    },
                  ],
                },
                // {
                //   id_params: "kode",
                //   route: "",
                //   type: "dialog",
                //   controller: "FormDialogKPDeleteComponent",
                //   toolTip: "Delete Data",
                //   icon: "fa fa-trash text-danger",
                //   condition: [
                //     {
                //       params_1: "kode",
                //       operator: "!=",
                //       params_2: null,
                //     },
                //   ],
                // },
              ],
              data: [],
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
              expand: false,
            },
          },
        ],
      },
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

  loadDataDaftarPeriksa(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pdjama/master/daftarPeriksaAudit", {
        where: "kode='" + this.params.kode + "'",
      })
      .toPromise();
  }

  async inisialisasiDataDaftarPeriksa(data) {
    this.formGroup
      .get("kode_daftar_periksa_audit")
      .setValue(data.kode_daftar_periksa_audit);
    this.formGroup.get("inisial").setValue(data.inisial);
    this.formGroup
      .get("nama_daftar_periksa")
      .setValue(data.nama_daftar_periksa);
    this.formGroup.get("deskripsi").setValue(data.deskripsi);
  }
}
