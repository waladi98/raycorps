import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { Router, Route, ActivatedRoute } from '@angular/router';
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';

import { CustomTable } from "../../../../components/custom-table/custom-table.interface";
import { Subject, Subscription, Observable } from "rxjs";

declare const require: any;
declare const $: any;

@Component({
  selector: 'app-kegiatan-sk3',
  templateUrl: 'kegiatan-sk3.component.html',
  styleUrls: ['./kegiatan-sk3.component.scss'],
  styles: [
    `
      md-calendar {
        width: 300px;
      }
    `,
  ],
})
export class KegiatanSK3Component implements OnInit {
  formGroup: FormGroup;

  listData2: CustomTable;
eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

  isLoadingTable = false;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  params: any;
  constructor(
    private _activatedRoute: ActivatedRoute,
    public breakpointObserver: BreakpointObserver,
    private formBuilder: FormBuilder
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log(
            'Matches small viewport or handset in portrait mode'
          );
        } else {
          this.isScreenSmall = false;
        }
      });
    this._activatedRoute.params.subscribe((params: any) => (this.params = params));
  }
  ngOnInit() {
    this.inisialisasiTable();

  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
  }

  inisialisasiTable() {
    this.listData2 = {
      is_action: true,
      filter: true,
      init_load: true,
      is_role: true,
      is_role_params: {
        prodi: "kode_prodi",
      },
      endpoint: "",
      action_name: "",
      type: "",
      order: "",
      where: "syarat_lengkap = 'T'",
      group: "",
      dynamic_header_field: "",
      dynamic_header_name: "",
      dynamic_header_value: "",
      dynamic_header_type: "",
      dynamic_header_add_index: 0,
      filter_builder: true,
      filter_data: [
        // {
        //   id: "tahun_akademik",
        //   label: "Tahun Akademik",
        //   data_list: [],
        //   type: "select",
        //   is_filter: false,
        //   value: null,
        //   trigger: false,
        //   trigger_id: "kode_gelombang",
        //   trigger_params: null,
        //   api: {
        //     endpoint: "/master/tahunAkademik",
        //     where: "id_aktif='Y' ",
        //     id: "tahun",
        //     label: "tahun_akademik",
        //   },
        // },
        // {
        //   id: "kode_gelombang",
        //   label: "Gelombang",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value: null,
        //   trigger: true,
        //   trigger_id: null,
        //   trigger_params: "kode_tahun_akademik",
        //   api: {
        //     endpoint: "/pmb/master/gelombang",
        //     where: "",
        //     id: "kode",
        //     label: "nama",
        //     concat: [
        //       {
        //         type: "string",
        //         field: "Gelombang",
        //       },
        //       {
        //         type: "string",
        //         field: " ",
        //       },
        //       {
        //         type: "value",
        //         field: "id_gelombang",
        //       },
        //     ],
        //   },
        // },
        // {
        //   id: "kode_prodi",
        //   label: "Prodi",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value: null,
        //   trigger: false,
        //   trigger_id: null,
        //   trigger_params: null,
        //   first_index_selected: true,
        //   api: {
        //     endpoint: "/master/prodi",
        //     where: "id_aktif='Y'",
        //     prodi_role: {
        //       param: "kode",
        //       is_role: true,
        //     },
        //     id: "kode",
        //     label: "prodi",
        //   },
        // },
        // {
        //   id: "kode_jenis_formulir",
        //   label: "Jenis Formulir",
        //   data_list: [],
        //   type: "select",
        //   is_filter: true,
        //   value: null,
        //   trigger: false,
        //   trigger_id: null,
        //   trigger_params: null,
        //   first_index_selected: false,
        //   api: {
        //     endpoint: "/pmb/master/jenisFormulir",
        //     where: "id_aktif='Y'",
        //     prodi_role: {
        //       param: "kode",
        //       is_role: false,
        //     },
        //     id: "kode",
        //     label: "nama",
        //   },
        // },
      ],
      header: [
        {
          type: "",
          label: "No",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "no",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        
        {
          type: "",
          label: "Jenis Kegiatan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "jenis_kegiatan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: true,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Kegiatan",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "kegiatan",
          filter: true,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Tingkat",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "tingkat",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Partisipasi",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "partisipasi",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "No. SK",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "no_sk",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Dokumen",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "dokumen",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Status Kegiatan",
          class: "text-sm text-center border border-black-300 bg-gray-400 ",
          field: "status_kegiatan",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
        {
          type: "",
          label: "Bobot",
          class: "text-sm text-center border border-black-300 bg-gray-400",
          field: "bobot",
          filter: false,
          filter_type: "text",
          filter_value: null,
          sort: false,
          sort_type: "",
          data: [],
        },
      ],
      field: [
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-2",
          field: "no",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "jenis_kegiatan",
        },
        {
          type: "",
          count_field: [],
          class: "text-left border border-black-300 w-72",
          field: "kegiatan",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-52",
          field: "tingkat",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "partisipasi",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "no_sk",
        },
        {
          type: "download",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "dokumen",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "status_kegiatan",
        },
        {
          type: "",
          count_field: [],
          class: "text-center border border-black-300 w-16",
          field: "bobot",
        },
      ],
      action: [
        {
          id_params: "",
          route: "",
          type: "route",
          icon: "fa fa-info-circle text-info",
          toolTip: "Informasi Lengkap Peserta",
        },
      ],
      data: [
        {
          jenis_kegiatan: "Kegiatan Pilihan",
          kegiatan: "Lorem",
          tingkat: "Internasional",
          partisipasi: "Juara 1",
          no_sk: "SK-123",
          dokumen: "Unduh",
          status_kegiatan: "Disetujui",
          bobot: "40"
        },
        {
          jenis_kegiatan: "Kegiatan Pilihan",
          kegiatan: "Lorem",
          tingkat: "Internasional",
          partisipasi: "Juara 1",
          no_sk: "SK-123",
          dokumen: "Unduh",
          status_kegiatan: "Disetujui",
          bobot: "40"
        },
      ],
      export:[{
        type:"csv",
        label:"CSV",
        label_report:"report-calon-peserta"
      },
      {
        type:"pdf",
        label:"PDF",
        label_report:"report-calon-peserta"
      },
      {
        type:"excel",
        label:"XLSX",
        label_report:"report-calon-peserta"
      }]
    };
  }
}