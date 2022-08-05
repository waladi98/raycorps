import {
    AfterViewInit,
    Component,
    ElementRef,
    EventEmitter,
    OnDestroy,
    OnInit,
    Inject,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl, FormArray } from '@angular/forms';
import { translate } from '@ngneat/transloco';
import { NgxSpinnerService } from 'ngx-spinner';
import { cloneDeep, isObject } from 'lodash';
import { of, Subject } from 'rxjs';
import { finalize, map, startWith, debounceTime, tap, switchMap, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dialog-filter-builder',
    templateUrl: 'dialog-filter-builder.html',
    styleUrls: ['./dialog-filter-builder.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class DialogFilterBuilder implements OnInit {
    params: any;
    listFilter: any[] = [];
    listField = [];
    listType = [{
        id: '<',
        label: 'Equals'
    },
    {
        id: '--',
        label: 'Is Between'
    }];
    constructor(
        @Inject(MAT_DIALOG_DATA) private data: any[],
        private dialogRef: MatDialogRef<DialogFilterBuilder>,
        private formBuilder: FormBuilder,
        private spinner: NgxSpinnerService,
    ) {

        this.params = data;

        if (typeof this.params.filter_builder_data !== "undefined") {
            this.listFilter = this.params.filter_builder_data;
        }

        for (let i = 0; i < this.params.header.length; i++) {
            if (this.params.field[i].type == "" && this.params.header[i].field != "no") {
                this.listField.push(this.params.header[i]);
            }
        }
        //console.log(this.params);
    }

    ngOnInit(): void {

    }

    closeDialog() {
        this.dialogRef.close();
    }

    onSubmit() {
     
        this.params.filter_builder_data = this.listFilter;
        this.dialogRef.close({ data: this.params });
    }

    addOrRemove(index: any): void {
       // console.log(index);
        if (index != -1) {
            this.listFilter.splice(index, 1);
        } else {
            this.listFilter.push({
                field: null,
                type: null,
                value_1: null,
                value_2: null,
            });
        }
    }
}
