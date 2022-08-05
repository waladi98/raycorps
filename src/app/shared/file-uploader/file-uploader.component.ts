import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../core/services/data.service';
import { Helper } from '../helper';
import { tap } from 'rxjs/operators';
import { FileUploaderConfig, FileUploadResponse } from './file-uploader';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-file-uploader',
    templateUrl: './file-uploader.component.html',
    styleUrls: ['./file-uploader.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [],
})
export class FileUploaderComponent implements OnInit {
    isError = false;
    isLoading = false;
    isFinishUpload = false;
    fileName: string;
    fileSize: any;
    message: string;
    toggleLog = true;
    uploadLogs: FileUploadResponse;
    progress = 0;
    response: any;
    constructor(
        @Inject(MAT_DIALOG_DATA) public config: FileUploaderConfig,
        public dialogRef: MatDialogRef<FileUploaderComponent>,
        private dataService: DataService
    ) { }

    ngOnInit(): void {
        this.dialogRef.beforeClosed().subscribe(() => { this.close(); });
     }

    onFileChange(ev: Event, fileInput: HTMLInputElement): void {
        const inputFile = ev.target as HTMLInputElement;
        if (!inputFile.files?.length) {
            return;
        }
        const fileSize = inputFile.files[0].size / 1024 / 1024; // in MiB
        if (this.config?.maxSize) {
            if (fileSize > this.config.maxSize) {
                this.message = 'Ukuran dokumen melebihi batas upload';
                return;
            }
        }

        this.fileName = inputFile.files[0].name;
        this.fileSize = Helper.bytesToSize(inputFile.files[0].size);
    }

    remove(file: HTMLInputElement): void {
        file.value = '';
        this.fileName = '';
        this.fileSize = 0;
    }

    download(): void {
        this.dataService
            .download(this.config.templateUrl, this.config.templateParams)
            .pipe(
                tap((response) => {
                    console.log(response.headers);
                    this.downloadFile(
                        response.body,
                        this.parseFilename(
                            response.headers.get('Content-Disposition')
                        )
                    );
                })
            )
            .subscribe();
    }

    async upload(inputFile: HTMLInputElement): Promise<any> {
        this.isLoading = true;

        if (!this.config?.uploadParams) {
            return;
        }

        if (!inputFile.files?.length) {
            return;
        }

        const file = inputFile.files[0];
        const params = new FormData();
        params.append('file', file, file.name);
        if (typeof this.config.uploadParams === 'object') {
            Object.keys(this.config.uploadParams).forEach((key) => {
                if (typeof this.config.uploadParams[key] !== 'undefined') {
                    params.append(key, this.config.uploadParams[key]);
                }
            });
        }


        const filename = await this.uploadFile(params);
        this.response = filename;
        console.log(filename);
        if (filename) {
            inputFile.value = '';
        }
    }

    uploadFile(params: FormData): Promise<any> {
        return new Promise((resolve, reject) => {
            const endpoint =
                this.dataService.getEndpoint() + this.config.uploadUrl;
            this.dataService.uploadFile(endpoint, params).subscribe(
                (event) => {
                    if (event.type === HttpEventType.UploadProgress) {
                        this.progress = Math.round(
                            (100 * event.loaded) / event.total
                        );
                    } else if (event instanceof HttpResponse) {
                        this.uploadLogs = event.body;
                        this.isFinishUpload = true;
                        this.isError = false;
                        resolve(event.body);
                    }
                },
                (error) => {
                    this.progress = 100;
                    this.isError = true;
                    this.isFinishUpload = true;
                    reject(null);
                }
            );
        });
    }

    private downloadFile(data: Blob, filename: string) {
        const blob = new Blob([data], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8;',
        });
        if (navigator.msSaveBlob) {
            // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            const link = document.createElement('a');
            if (link.download !== undefined) {
                // Browsers that support HTML5 download attribute
                const url = URL.createObjectURL(blob);
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    private parseFilename(contentDisposition): string {
        if (!contentDisposition) return null;
        let matches = /filename="(.*?)"/g.exec(contentDisposition);

        return matches && matches.length > 1 ? matches[1] : null;
    }

    close(){
        this.dialogRef.close({data:this.uploadLogs});
    }

}
