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
import { NgxSpinnerService } from "ngx-spinner";
import { DataService } from "../../../../../core/services/data.service";
declare const require: any;

declare const $: any;

@Component({
  selector: "app-form-dialog",
  templateUrl: "form-dialog.component.html",
  styleUrls: ["./form-dialog.component.scss"],
})
export class FormDialogComponent implements OnInit {
  formGroup: FormGroup;
  dataParam: any;
  isPreparingForm = false;
  spinnerStatus = "Mohon Tunggu...";
  isLoading = false;
  spinnerName = "formSpinner";
  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private dataService: DataService,
    private dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    this.params = this.data;
    this.breakpointObserver;
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      id: ["", Validators.required],
      nama_gelombang: ["", Validators.required],
      id_aktif: ["", Validators.required],
    });
    //this.loadInitialDataUpdate();

    console.log(this.params);
  }

  async loadInitialDataUpdate(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.spinnerStatus = "Mohon Tunggu...";
      this.showSpinner();

      // this.makeForm();

      const request = [this.loadDataUpdate()];

      const [dataUpdate] = await Promise.all(request);

      let data = dataUpdate.result[0];

      this.formGroup.get("id").setValue(data.id);
      this.formGroup.get("nama_gelombang").setValue(data.gelombang);
      this.formGroup.get("id_aktif").setValue(data.id_aktif);

      this.isPreparingForm = false;
      //untuk loading data
      this.hideSpinner();
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

  loadDataUpdate(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/referensi/gelombang", {
        where: "id ='01'",
      })
      .toPromise();
  }
}
