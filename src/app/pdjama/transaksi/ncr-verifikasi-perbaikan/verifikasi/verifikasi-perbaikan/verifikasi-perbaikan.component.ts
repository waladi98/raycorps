import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
  ViewEncapsulation,
} from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl,
} from "@angular/platform-browser";
import { Router, Route, ActivatedRoute } from "@angular/router";
import { finalize, map, takeUntil } from "rxjs/operators";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DataService } from "../../../../../core/services/data.service";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialog } from "@angular/material/dialog";
import { NgxSpinnerService } from "ngx-spinner";
import { FileUploaderService } from "../../../../../shared/file-uploader/file-uploader.service";
import swal from "sweetalert2";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../../shared/types/common";
declare const require: any;

declare const $: any;

interface stat_aktif {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-verifikasi-perbaikan",
  templateUrl: "verifikasi-perbaikan.component.html",
  styleUrls: ["./verifikasi-perbaikan.component.scss"]
})
export class VerifikasiPerbaikanComponent implements OnInit {


  loadDataTable() {
  }

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;
  file_name: any;

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
    private fileUploaderService: FileUploaderService,
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

  openFileUploader(): void {
    this.fileUploaderService
      .open({
        title: "Unggah Tanda Tangan",
        templateUrl: "",
        templateParams: {
          action: "",
        },
        uploadUrl: "/file/uploadFile",
        uploadParams: {
          path: "pdjama",
        },
        downlodButtonText: "Download Template",
        uploadButtonText: "Upload",
      })
      .afterClosed()
      .subscribe((result) => {
        if (result.data) {
          this.file_name = result.data.result.filename;
          this.formGroup
            .get("path_to_tanda_tangan")
            .setValue(result.data.result.newfilename);
        }
      });
  }

  cancelUpload() {
    //this.dataPendaftaranPmb.bukti_setoran=null;
    this.formGroup.get("path_to_tanda_tangan").setValue(null);
  }
}

