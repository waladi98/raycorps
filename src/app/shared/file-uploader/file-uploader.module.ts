import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './file-uploader.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    declarations: [FileUploaderComponent],
    imports: [
        CommonModule,
        MatDialogModule,
        MatToolbarModule,
        MatTooltipModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatProgressBarModule,
        MatFormFieldModule
    ]
})
export class FileUploaderModule {}
