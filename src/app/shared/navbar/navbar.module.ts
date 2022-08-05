import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';
import { NgxNavbarModule } from 'ngx-bootstrap-navbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTreeModule} from '@angular/material/tree';

@NgModule({
    imports: [
        BrowserAnimationsModule,
        RouterModule, 
        CommonModule,
        NgxNavbarModule,
        MatTreeModule
    ],
    declarations: [NavbarComponent],
    exports: [NavbarComponent]
})

export class NavbarModule { }
