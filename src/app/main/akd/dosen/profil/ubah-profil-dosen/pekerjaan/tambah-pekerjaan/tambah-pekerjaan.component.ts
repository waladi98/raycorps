import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  Inject,
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
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
// import { FormsModule, ReactiveFormsModule } from "@angular/forms";
// import { MdModule } from "../../../../../../../md/md.module";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-tambah-pekerjaan",
  templateUrl: "tambah-pekerjaan.component.html",
  styleUrls: ["./tambah-pekerjaan.component.scss"],
})
export class TambahPekerjaanComponent implements OnInit {
  formGroup: FormGroup;

  dataParam = {
    type: null,
  };
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<TambahPekerjaanComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.dataParam = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: ["", Validators.required],
      nama_gelombang: ["", Validators.required],
      aktif: ["", Validators.required],
    });
  }
}
