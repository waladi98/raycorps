import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import { Router, Route, ActivatedRoute } from "@angular/router";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { finalize, map, takeUntil } from "rxjs/operators";
import { PageEvent } from "@angular/material/paginator";
import { MatDialog } from "@angular/material/dialog";
import { FormDialogComponent } from "./form-dialog/form-dialog.component";
import { DataService } from "../../../core/services/data.service";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import { FormGroup,Validators,FormBuilder } from "@angular/forms";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-pengaturan",
  templateUrl: "pengaturan.component.html",
  styleUrls: ["./pengaturan.component.scss"],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class PengaturanComponent implements OnInit {

  isScreenSmall: boolean;

  params: any;
  formGroup:FormGroup

  datapengaturan:any
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public dialog: MatDialog
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
    this.formGroup = this.formBuilder.group({
      atas_nama: [{ value: "", disabled: true }],
      url: [{ value: "", disabled: true }],
      nara_hubung: [{ value: "", disabled: true }],
      email: [{ value: "", disabled: true }],
      opsi_pilihan_2: [{ value: "", disabled: true }],
      opsi_pilihan_3: [{ value: "", disabled: true }],
      persen_min_registrasi: [{ value: "", disabled: true }],
      spp_registrasi_fk: [{ value: "", disabled: true }],
      spp_registrasi_fkg: [{ value: "", disabled: true }],
      kode_komponen_registrasi: [{ value: "", disabled: true }],
      link_wa_cetak_kartu: [{ value: "", disabled: true }],
      link_wa_cetak_kelulusan: [{ value: "", disabled: true }],
      endpoint_kelulusan: [{ value: "", disabled: true }],
    });

    this.loadInitialData();
  }

  async loadInitialData(): Promise<any> {
    try {
      const request = [this.loadDataPengaturan()];

      const [datapengaturan] = await Promise.all(request);
      this.datapengaturan = datapengaturan.result[0];
      this.inisialisasiDataForm(this.datapengaturan);
      console.log(this.datapengaturan);
    } catch (error) {
      console.log(error);
      //this.showSpinner();
    }
  }
  
  loadDataPengaturan(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/pengaturan", {})
      .toPromise();
  }
  
  inisialisasiDataForm(data) {
    // let status = "Belum Bayar";
    // if (data.id_status_bayar == "Y") {
    //   status = "Sudah Bayar";
    // }

    this.formGroup.get("atas_nama").setValue(data.atas_nama);
    this.formGroup.get("url").setValue(data.url);
    this.formGroup.get("nara_hubung").setValue(data.nara_hubung);
    this.formGroup.get("email").setValue(data.email);
    this.formGroup.get("opsi_pilihan_2").setValue(data.opsi_pilihan_2);
    this.formGroup.get("opsi_pilihan_3").setValue(data.opsi_pilihan_3);
    this.formGroup.get("persen_min_registrasi").setValue(data.persen_min_registrasi);
    this.formGroup.get("spp_registrasi_fk").setValue(data.spp_registrasi_fk);
    this.formGroup.get("spp_registrasi_fkg").setValue(data.spp_registrasi_fkg);
    this.formGroup.get("kode_komponen_registrasi").setValue(data.kode_komponen_registrasi);
    this.formGroup.get("link_wa_cetak_kartu").setValue(data.link_wa_cetak_kartu);
    this.formGroup.get("link_wa_cetak_kelulusan").setValue(data.link_wa_cetak_kelulusan);
    this.formGroup.get("endpoint_kelulusan").setValue(data.endpoint_kelulusan);

  }


  
}
