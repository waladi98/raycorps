import { Router, Route, ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import {
  AfterViewInit,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  ElementRef,
} from "@angular/core";
import {
  FormArray,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from "@angular/forms";
import { DataService } from "../../../app/core/services/data.service";
import { RecaptchaErrorParameters } from "ng-recaptcha";
import { HttpClient } from "@angular/common/http";
import { Subject, Subscription, Observable } from "rxjs";
import swal from "sweetalert2";
import {
  CommonReference,
  FormOptions,
  FormResponse,
} from "../../../app/shared/types/common";
import { finalize, takeUntil } from "rxjs/operators";
import { cloneDeep } from "lodash";

declare const require: any;

declare const $: any;

@Component({
  selector: "app-pmb-reservasi-pmb",
  templateUrl: "reservasi-pmb.component.html",
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class ReservasiPmbComponent implements OnInit {
  isPreparingForm = false;
  isLoading = false;
  spinnerName = "formPmbSpinner";
  formGroup: FormGroup;
  dataPendaftaranPmb: any;
  params: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private http: HttpClient,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.params.subscribe(
      (params: any) => (this.params = params)
    );
  }

  ngOnInit() {
    if (this.params) {
      this.loadInitialData();
    }
  }

  async loadInitialData(): Promise<any> {
    try {
      this.isPreparingForm = true;
      this.showSpinner();

      // this.makeForm();

      const request = [this.loadDataPendaftaranPmb()];

      const [dataPendaftaran] = await Promise.all(request);
      this.dataPendaftaranPmb = dataPendaftaran.result[0];

      this.isPreparingForm = false;
      this.hideSpinner();
    } catch (error) {
      console.log(error);
      this.hideSpinner();
    }
  }

  makeForm(): void {}

  loadDataPendaftaranPmb(): Promise<any> {
    return this.dataService
      .getRequest<any>("/pmb/formulirOnline", {
        where: "id='" + this.params.id + "'",
      })
      .toPromise();
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

  cetakBuktiPendaftaran(): void {
	   console.log( this.dataPendaftaranPmb.hash_id);
    this.dataService
      .getPostRequest<any>("/pmb/formulirOnline/bukti", {
        id: this.dataPendaftaranPmb.hash_id,
      })
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
