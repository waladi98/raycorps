import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NavbarHomeComponent } from "./navbar-home.component";
import { NgxNavbarModule } from "ngx-bootstrap-navbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTreeModule } from "@angular/material/tree";
import { MatMenuModule } from "@angular/material/menu";
@NgModule({
  imports: [
    BrowserAnimationsModule,
    RouterModule,
    CommonModule,
    NgxNavbarModule,
    MatTreeModule,
    MatMenuModule,
  ],
  declarations: [NavbarHomeComponent],
  exports: [NavbarHomeComponent],
})
export class NavbarHomeModule {}
