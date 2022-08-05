import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarPmbComponent } from "./navbar-pmb.component";
import { NgxNavbarModule } from "ngx-bootstrap-navbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTreeModule } from "@angular/material/tree";
import { MatMenuModule } from "@angular/material/menu";
import {OverlayModule} from '@angular/cdk/overlay';
import { MatTooltipModule } from "@angular/material/tooltip";



@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    NgxNavbarModule,
    MatTreeModule,
    MatMenuModule,
    OverlayModule,
    MatTooltipModule
  ],
  declarations: [NavbarPmbComponent],
  exports: [NavbarPmbComponent],
})
export class NavbarPmbModule {}
