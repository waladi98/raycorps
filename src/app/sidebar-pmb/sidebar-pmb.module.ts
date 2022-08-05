import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarPmbComponent } from './sidebar-pmb.component';

@NgModule({
    imports: [ RouterModule, CommonModule ],
    declarations: [ SidebarPmbComponent ],
    exports: [ SidebarPmbComponent ]
})

export class SidebarPmbModule {}
