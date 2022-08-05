import { Component, OnInit, AfterViewInit } from "@angular/core";
import { TableData } from "../../md/md-table/md-table.component";
import { LegendItem, ChartType } from "../../md/md-chart/md-chart.component";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
// import PerfectScrollbar from 'perfect-scrollbar';
import { DataService } from "../../../app/core/services/data.service";
import { NgxSpinnerService } from "ngx-spinner";

import * as Chartist from "chartist";
import { Router } from "@angular/router";
import { finalize, takeUntil } from "rxjs/operators";
import { StorageService } from "../../core/services/storage.service";

declare const $: any;

@Component({
  selector: "app-pmb-dashboard-pmb",
  templateUrl: "./dashboard-pmb.component.html",
})
export class DashboardPmbComponent implements OnInit, AfterViewInit {
  user = this._storageService.get("username");
  id = this._storageService.get("kelompok");
  spinnerStatus = "Mohon Tunggu...";
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  dataPendaftaranPmb: { id; hash_id; id_status_bayar; link_reservasi };
  dataPeserta: {
    id: null;
    hash_id: null;
    nama: null;
    dokumen_kelengkapan: null;
    dokumen_persyaratan: null;
    rekap_nilai: null;
    lulus: null;
    link_kartu: null;
    link_kelulusan: null;
    id_status_seleksi: null;
    proses_persyaratan: null;
  };
  listDataSalam= {
    kode:null,
    salam:null
  };
  menu_history = null;
  menu_iframe = null;
  pesan=null;
  constructor(
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private _storageService: StorageService,
  ) {}

  ngOnInit() {
    this.loadInitialData();
  }

  ngAfterViewInit() {
    // this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";

      this.showSpinner();

      // this.makeForm();

      const request = [
        this.loadDataPendaftaranPmb(),
        this.getInfoPeserta(),
        this.loadDataSalam(),
      ];

      const [dataPendaftaran, dataPeserta, listDataSalam] = await Promise.all(
        request
      );
      this.dataPendaftaranPmb = dataPendaftaran.result[0];
      //this.dataPeserta = dataPeserta.result[0];
      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      this._storageService.set('peserta_id',this.dataPeserta.id);
      
      this.listDataSalam = listDataSalam.result[0];
      this.isPreparingForm = false;
      // this.menu_history = this._storageService.get("hsiotyr");
      // this.menu_iframe = this._storageService.get("frame_title");
      this.hideSpinner();
      this.helloShow();
      this.notif(this.dataPeserta);
      this.notifKelengkapan(this.dataPeserta);
      // if (this.menu_history !=  "") {
      //   console.log('hide helloShow');
        
      // } else if (this.menu_iframe != "") {
      //   console.log('hide helloShow');
      // } else {
        
      //}
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  showSpinner(): void {
    this.isLoading = true;
    this.spinner.show(this.spinnerName);
  }

  hideSpinner(): void {
    setTimeout(() => {
      this.isLoading = false;
      this.spinner.hide(this.spinnerName);
    }, 2000);
  }

  helloShow() {
    var welcome =this._storageService.get('welcome');
    if(welcome == '1'){
      return false;
    }else{
      this._storageService.set('welcome','1');
    }
    // this.isLoading = true;
    swal
      .fire({
        html:
          "<h5> <b>" +
          this.listDataSalam.salam +
          "</b></h5><b>Selamat Datang di SMART CAMPUS YARSI</b>",
        width: 450,
        icon: "success",
        customClass: {
          confirmButton: "btn btn-success",
        },
        buttonsStyling: false,
        showCancelButton: false,
        confirmButtonText: "Ok",
      })
      .then((result) => {
        // this.router.navigate(["/pmb/dashboarda"]);
        //this.ngAfterViewInit();
      });
  }

  notif(data){
    var notif =this._storageService.get('notif');
    if(notif == '1'){
      return false;
    }else{
      this._storageService.set('notif','1');
    }
    setTimeout(() => {
      if(data.syarat){
        this.pesan = data.syarat;
      } else {
        this.pesan = "-------------"
      }
      if(!data){
        return false;
      } else if(data.proses_persyaratan == 'T'){
        swal.fire({
          position: 'top-start',
          icon: 'info',
          html:
              "<p>Masih terdapat Dokumen persyaratan anda yang belum diunggah, pastikan persyaratan yang statusnya wajib didahulukan, segera lengkapi kembali.<p>",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
          showCancelButton: false,
          confirmButtonText: "Ok",
        })
        
      } else if(data.dokumen_persyaratan.match(/Dokumen Tidak Sesuai.*/) || data.dokumen_persyaratan.match(/Belum Lengkap.*/) ){
        swal.fire({
          position: 'top-start',
          icon: 'warning',
          html:
              "<p>Dokumen persyaratan anda ada yang tidak sesuai atau belum lengkap, segera cek menu dokumen persyaratan kembali!<p>" + "<b>Pesan Petugas PMB: </b> </br>" + this.pesan,
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
          showCancelButton: false,
          confirmButtonText: "Ok",
        })
      }
    }, 5000)
  }
  notifKelengkapan(data){
    // var notif =this._storageService.get('notifKelengkapan');
    // if(notif == '1'){
    //   return false;
    // }else{
    //   this._storageService.set('notifKelengkapan','1');
    // }
    setTimeout(() => {
      // if(data.syarat){
      //   this.pesan = data.syarat;
      // } else {
      //   this.pesan = "-------------"
      // }
      if(!data){
        return false;
      } else if(data.dokumen_kelengkapan.match(/Belum Diunggah.*/)){
        swal.fire({
          position: 'top-start',
          icon: 'info',
          html:
              "<p>Masih terdapat Dokumen kelengkapan anda yang belum diunggah, segera periksa dan lengkapi dokumen kelengkapan anda.<p>",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
          showCancelButton: false,
          confirmButtonText: "Ok",
        })
        
      } else if(data.dokumen_kelengkapan.match(/Dokumen Tidak Sesuai.*/) || data.dokumen_kelengkapan.match(/Belum Lengkap.*/) ){
        swal.fire({
          position: 'top-start',
          icon: 'warning',
          html:
              "<p>Dokumen dokumen_kelengkapan anda ada yang tidak sesuai atau belum lengkap, segera cek menu dokumen persyaratan kembali!<p>",
          customClass: {
            confirmButton: "btn btn-success",
          },
          buttonsStyling: false,
          showCancelButton: false,
          confirmButtonText: "Ok",
        })
      }
    }, 5000)
  }
  // hello(): void {
  //   setTimeout(() => {
  //     this.isLoading = false;
  //     this.helloShow();
  //   }, 5000);
  // }
  loadDataSalam(): Promise<any> {
    return this.dataService
      .getRequest<any>("/master/salam", {
        where: "kode='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }
  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this._storageService.get("username") + "'",
      })
      .toPromise();
  }

  getInfoPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + this.user + "'",
      })
      .toPromise();
  }

  cetakKartuPeserta(): void {
    if (this._storageService.get("username")) {
      this.showSpinner();
      this.dataService
        .getPostRequest<any>("/pmb/peserta/kartu", {
          id: this.dataPeserta.hash_id,
        })
        .pipe(finalize(() => this.hideSpinner()))
        .subscribe(
          (response) => {
            window.open(response.result.link, "_blank");
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }
  cetakKartuKelulusan(): void {
    if (this._storageService.get("username")) {
      this.showSpinner();
      this.dataService
        .getPostRequest<any>("/pmb/kelulusan/print", {
          id: this.dataPeserta.hash_id,
        })
        .pipe(finalize(() => this.hideSpinner()))
        .subscribe(
          (response) => {
            window.open(response.result.link, "_blank");
          },
          (error) => {
            console.log(error);
          }
        );
    }

    // if (data == 1) {
    //   swal.fire({
    //     icon: "error",
    //     title: "Menu Kelulusan",
    //     text: "Anda lulus"
    //   });
    // }else if(data == 2){
    //   swal.fire({
    //     icon: "error",
    //     title: "Menu Kelulusan",
    //     text: "Anda Tidak lulus"
    //   });
    // }else if(data == 3){
    //   swal.fire({
    //     icon: "error",
    //     title: "Menu Kelulusan",
    //     text: "Cadangan"
    //   });
    // }
  }
  cetakPengumumanNRP(): void {
    swal
      .fire({
        title: "Apakah anda ingin mengunduh hasil seleksi?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya",
        cancelButtonText: "Tidak",
      })
      .then((result) => {
        if (result.isConfirmed) {
          if (this._storageService.get("username")) {
            this.showSpinner();
            this.dataService
              .getPostRequest<any>("/pmb/kelulusan/print", {
                id: this.dataPeserta.hash_id,
              })
              .pipe(finalize(() => this.hideSpinner()))
              .subscribe(
                (response) => {
                  window.open(response.result.link, "_blank");
                },
                (error) => {
                  console.log(error);
                }
              );
          }

          // swal.fire(
          //   'Unduh Berhasil',
          //   'Semoga mendapatkan hasil kelulusan yang terbaik.',
          //   'success'
          // )
        }
      });
  }
  cetakReservasi(): void {
    if (this._storageService.get("username")) {
      this.showSpinner();
      this.dataService
        .getPostRequest<any>("/pmb/formulirOnline/bukti", {
          id: this.dataPendaftaranPmb.hash_id,
        })
        .pipe(finalize(() => this.hideSpinner()))
        .subscribe(
          (response) => {
            window.open(response.result.link, "_blank");
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  setTitle(title, link) {   
    //localStorage.setItem("title", title);
    this._storageService.set("frame_title", title);
    this._storageService.set(
      "frame_url",
      "https://smart.yarsi.ac.id/prototipe/frame_modul.php"
    );
    this.router.navigate(["/pmb/frame/modul=" + link]);
  }

  confirmStatus(data) {
    if (data == "BelumBayar") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Selesaikan pembayaran formulir terlebih dahulu",
      });
    }
  }
  confirmStatusLulus(data) {
    if (data == "BelumLulus") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Silahkan cek status kelulusan anda",
      });
    }
  }
  confirmStatusKelengkapan(data) {
    if (data == "BelumIsiKelengkapan") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Silahkan lengkapi berkas dan data registrasi ulang anda",
      });
    }
  }
  confirmStatusSyarat(data) {
    if (data == "BelumIsiSyarat") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Silahkan lengkapi berkas dan data formulir pendaftaran anda",
      });
    }
  }
  confirmStatusUnggahSyarat(data) {
    if (data == "BelumDiunggah") {
      swal.fire({
        icon: "info",
        title: "Menu belum bisa diakses",
        text: "Silahkan lengkapi Dokumen persyaratan anda terlebih dahulu",
      });
    }
  }
  confirmKelulusan(data) {
    if (data == "kelulusan") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Silahkan lengkapi berkas dan data registrasi ulang anda",
      });
    }
  }
  confirmKartuLulus(data) {
    if (data == "kartu") {
      swal.fire({
        icon: "info",
        title: "Menu belum bisa diakses",
        text: "Status kelulusan anda masih dalam diproses..",
      });
    }
  }
  confirmStatusKartu(data) {
    if (data == "BelumIsiFormulir") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Harap isi formulir pendaftaran terlebih dahulu",
      });
    }
  }
  confirmPengumumanRegis(data) {
    if (data == "404") {
      swal.fire({
        icon: "warning",
        title: "Menu belum bisa diakses",
        text: "Pengumuman N.P.M akan diinfokan selanjutnya",
      });
    }
  }

  confirmStatusPersyaratan(data) {
    if (data.id_status_seleksi == 0) {
      swal
        .fire({
          title: "Daftar PMB",
          text: "Cek dan lengkapi dokumen persyaratan anda",
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
            this.cetakKartuKelulusan();
          }
        });
    }
  }
}
