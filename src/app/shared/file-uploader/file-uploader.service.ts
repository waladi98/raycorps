import { Injectable } from '@angular/core';
import {
    MatDialog,
    MatDialogConfig,
    MatDialogRef,
} from '@angular/material/dialog';
import { merge } from 'lodash';
import { FileUploaderConfig } from './file-uploader';
import { FileUploaderComponent } from './file-uploader.component';

@Injectable({
    providedIn: 'root',
})
export class FileUploaderService {
    private _defaultConfig: MatDialogConfig = {
        panelClass: 'custom-form-panel',
        width: '768px',
    };

    constructor(private matDialog: MatDialog) {}

    open(
        fileUploaderConfig: FileUploaderConfig,
        config?: MatDialogConfig
    ): MatDialogRef<FileUploaderComponent> {
        const userConfig = merge({}, this._defaultConfig, config);

        userConfig.data = fileUploaderConfig;

        return this.matDialog.open(FileUploaderComponent, userConfig);
    }
}
