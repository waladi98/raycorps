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
  selector: "app-aksi-ketidaksesuaian",
  templateUrl: "aksi.component.html",
  styleUrls: ["./aksi.component.scss"],
})
export class KetidaksesuaianComponent implements OnInit {
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

  inisialisasiTable() {}

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