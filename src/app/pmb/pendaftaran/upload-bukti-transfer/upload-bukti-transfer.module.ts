import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MdModule } from "../../../md/md.module";
import { MaterialModule } from "../../../app.module";
import { RecaptchaModule } from "ng-recaptcha";
import { HttpClientModule } from "@angular/common/http";
import { UploadBuktiTransferComponent } from "./upload-bukti-transfer.component";
import { UploadBuktiTransferRoutes } from "./upload-bukti-transfer.routing";
import { FileUploaderModule } from '../../../shared/file-uploader/file-uploader.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(UploadBuktiTransferRoutes),
    FormsModule,
    ReactiveFormsModule,
    MdModule,
    MaterialModule,
    RecaptchaModule,
    HttpClientModule,
    FileUploaderModule
  ],
  declarations: [UploadBuktiTransferComponent],
})
export class UploadBuktiTransferModule {}
