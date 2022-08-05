import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { DataService } from "../../../../../core/services/data.service";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from "@angular/forms";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { cloneDeep } from "lodash";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../../../shared/types/common";

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-verifikasi-kelulusan-peserta',
  templateUrl: 'verifikasi-kelulusan-peserta.component.html',
  styleUrls: ['./verifikasi-kelulusan-peserta.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class VerifikasiKelulusanPesertaComponent implements OnInit {
  listData = {
    header: [],
    field: [],
    action: [],
    data: []
  };

  verifikasi = [
    { value: '1', viewValue: 'Belum diverifikasi' },
    { value: '2', viewValue: 'Dalam Proses' },
    { value: '3', viewValue: 'Lulus Verifikasi' },
    { value: '4', viewValue: 'Data Tidak Lengkap' },
    { value: '5', viewValue: 'Data Salah Input' },
  ];

  tes_kesehatan = [
    { value: '1', viewValue: 'Belum diproses' },
    { value: '2', viewValue: 'Direkomendasikan' },
    { value: '3', viewValue: 'Tidak Direkomendasikan' },
    { value: '4', viewValue: 'Tes Menyusul' },
  ];

  tes_psikologi = [
    { value: '1', viewValue: 'Belum tes' },
    { value: '2', viewValue: 'Dalam Proses Verifikasi' },
    { value: '3', viewValue: 'Memenuhi Syarat' },
    { value: '4', viewValue: 'Tidak Memenuhi Syarat' },
  ];

  status_lulus = [
    { value: '1', viewValue: 'Belum diproses' },
    { value: '2', viewValue: 'Lulus' },
    { value: '3', viewValue: 'Tidak Lulus' },
    { value: '4', viewValue: 'Cadangan' },
    { value: '5', viewValue: 'Data Tidak Lengkap' },
  ];

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  dataPendaftaranPmb: any;
  dataPeserta: any;

  formGroup: FormGroup;
  listDataPilihanProdi = [];
  listDataPersyaratan = [];
  listDataStatus = [];
  dataPesertaNilai: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router

  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formulir_id: [{ value: "", disabled: true }],
      nama: [{ value: "", disabled: true }],
      keterangan: [""],
      prodi_pilihan: new FormArray([]),
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      const request = [
        this.loadDataPendaftaranPmb(),
        this.loadDataPeserta(),
        this.loadDataPesertaPersyaratan(),
        this.loadDataStatus(),
      ];

      const [
        dataPendaftaran,
        dataPeserta,
        listDataPersyaratan,
        listDataStatus,
      ] = await Promise.all(request);

      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      if (this.dataPeserta) {
        this.inisialisasiDataFormPeserta(this.dataPeserta);
      }

      this.listDataPersyaratan = listDataPersyaratan.result;
      this.listDataStatus = listDataStatus.result;


    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this.params.formulir_id + "'",
      })
      .toPromise();
  }

  loadDataPeserta(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/peserta", {
        where: "formulir_id='" + this.params.formulir_id + "'",
      })
      .toPromise();
  }

  loadDataPesertaPilihanProdi(id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPilihanProdi", {
        where: "peserta_id = '" + id + "'",
      })
      .toPromise();
  }

  loadDataPesertaPersyaratan(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPersyaratan", {
        where: "formulir_id='" + this.params.formulir_id + "'",
        order: " required DESC"
      })
      .toPromise();
  }

  loadDataStatus(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/statusSeleksi", {
        where: "id_aktif='Y'"
      })
      .toPromise();
  }

  inisialisasiDataFormPilihanProdi(data, jml_data) {
    this.listDataPilihanProdi = [];

    for (let i = 0; i < jml_data; i++) {
      this.listDataPilihanProdi.push({ value: data[i].prodi, disabled: true, status_seleksi: data[i].status_seleksi, id_status_seleksi: data[i].id_status_seleksi });
    }
  }

  async inisialisasiDataFormPeserta(data) {
    this.formGroup.get("formulir_id").setValue(data.formulir_id + '/ ' + data.id);
    this.formGroup.get("nama").setValue(data.nama);
    this.formGroup.get("keterangan").setValue(data.syarat);



    const request = [
      this.loadDataPesertaPilihanProdi(data.id)
    ];

    const [
      listDataPesertaPilihanProdi
    ] = await Promise.all(request);

    this.inisialisasiDataFormPilihanProdi(listDataPesertaPilihanProdi.result, data.jumlah_pilihan);

    this.loadInitialDataTabRapor();
  }

  async loadInitialDataTabRapor(): Promise<any> {
    try {
      const request = [this.loadDataPesertaNilai(this.dataPeserta.id)];

      const [dataPesertaNilai] = await Promise.all(request);

      this.dataPesertaNilai = [];

      let dataNilai = dataPesertaNilai.result;

      for (let i = 0; i < dataNilai.length; i++) {
        dataNilai[i].semester = dataNilai[i].komponen.charAt(
          dataNilai[i].komponen.length - 1
        );
        dataNilai[i].name = dataNilai[i].komponen
          .replace("Smst.", "")
          .replace(dataNilai[i].semester, "")
          .replace(/  +/g, "");
      }

      var semester = dataNilai
        .map((item) => item.semester)
        .filter((value, index, self) => self.indexOf(value) === index);

      for (let i = 0; i < semester.length; i++) {
        var matkul = [];

        for (let j = 0; j < dataNilai.length; j++) {
          if (dataNilai[j].semester == semester[i]) {
            matkul.push(dataNilai[j]);
          }
        }
        this.dataPesertaNilai.push({
          semester: semester[i],
          matkul: matkul,
        });
      }

      console.log(this.dataPesertaNilai);
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }

  loadDataPesertaNilai(peserta_id): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaNilai", {
        where: "peserta_id = '" + peserta_id + "'",
      })
      .toPromise();
  }

  getDataPesertaPilihanProdi(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/pesertaPilihanProdi", {
        where: "peserta_id = '" + this.dataPeserta.id + "' AND pilihan ='" + this.dataPeserta.pilihan_ke + "'",
      })
      .toPromise();
  }

  onSubmit() {
    swal
      .fire({
        title: "Verifikasi Kelulusan",
        text: "Apakah Yakin Akan Submit Data Ini?",
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
          this.getDataPesertaProdi();
        }
      });
  }

  async getDataPesertaProdi() {
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);


    try {
      const request = [
        this.loadDataPeserta(),
      ];

      const [
        dataPeserta,
      ] = await Promise.all(request);


      this.dataPeserta =
        dataPeserta.result.length > 0 ? dataPeserta.result[0] : false;

      this.submitVerifikasi();




    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }


  }

  async submitVerifikasi() {
    //this.showSpinner();
    const value = cloneDeep(this.formGroup.value);


    try {
      const request = [
        this.getDataPesertaPilihanProdi(),
      ];

      const [
        dataPesertaPilihanProdi,
      ] = await Promise.all(request);

      let dataPesertaPilihanProdiResult =
        dataPesertaPilihanProdi.result.length > 0 ? dataPesertaPilihanProdi.result[0] : false;

      if (dataPesertaPilihanProdiResult) {
        const payload = {
          id: dataPesertaPilihanProdiResult.id,
          id_status_seleksi: this.formGroup.get('keterangan').value,
        };
        this.dataService
          .getPostRequest<FormResponse>("/pmb/pesertaPilihanProdi/modify", payload)
          .subscribe(
            (success) => {
              if (success.message == "Invalid Parameter") {
                swal.fire({
                  title: "Verifikasi Kelulusan",
                  text: "Verifikasi Kelulusan Gagal di Simpan.",
                  icon: "error",
                  customClass: {
                    confirmButton: "btn btn-error",
                  },
                  buttonsStyling: false,
                });
              } else {
                swal
                  .fire({
                    title: "Verifikasi Kelulusan",
                    text: "Verifikasi Kelulusan Berhasil di Simpan.",
                    icon: "success",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                    showCancelButton: false,
                    confirmButtonText: "Ok",
                  })
                  .then((result) => {
                    this.toRoute(success.result);
                  });
              }
            },
            (error) => {
              swal.fire({
                title: "Verifikasi Kelulusan",
                text: "Verifikasi Kelulusan Gagal di Simpan.",
                icon: "error",
                customClass: {
                  confirmButton: "btn btn-error",
                },
                buttonsStyling: false,
              });
            }
          );
      }


    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }


  }

  toRoute(data) {
    if (data) {
      this.router.navigate(["/pmb/staff/penyaringan-pmb/verifikasi-kelulusan-dan-nilai/daftar-peserta-pmb"]);
    }
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: '#',
          class: 'text-sm text-center border border-black-300 bg-gray-400 w-20',
          field: 'no',
        },
        {
          label: 'No. PMB',
          class: 'text-sm text-left border border-black-300 bg-gray-400 w-30',
          field: 'kode',
        },
        {
          label: 'Nama',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'nama',
        },
        {
          label: 'Verifikasi Dokumen',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'kode_prodi',
        },
        {
          label: 'Tes Kesehatan',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'Tes Psikologi',
          class: 'text-sm text-left border border-black-300 bg-gray-400',
          field: 'status',
        },
        {
          label: 'AKSI',
          class: 'text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400',
          field: 'action',
        }
      ],
      field: [
        {
          class: 'text-center border border-black-300',
          field: '#',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nopmb',
        },
        {
          class: 'text-left border border-black-300',
          field: 'nama',
        },
        {
          class: 'text-left border border-black-300',
          field: 'verifikasi-dokumen',
        },
        {
          class: 'text-left border border-black-300',
          field: 'tes-kesehatan',
        },
        {
          class: 'text-left border border-black-300',
          field: 'tes-psikologi',
        },
        {
          class: 'text-center border border-black-300',
          field: 'action',
        }],
      action: [{
        action_name: "manageData",
        icon: "fa fa-edit",
      }],
      data: []
    };
  }
}
