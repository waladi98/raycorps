import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import { finalize, map, takeUntil } from 'rxjs/operators';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
import { PageEvent } from '@angular/material/paginator';
import { CustomTable } from "../../components/custom-table/custom-table.interface";
import { Subject, Subscription, Observable } from "rxjs";

declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-feeder-akademik-mahasiswa',
    templateUrl: 'page-menu.component.html'
})

export class PageMenuComponent implements OnInit {
    myType = 'PieChart';
    myData = [
      ['Budha', 4],
      ['Islam', 941],
      ['Katolik', 9],
      ['.Lainnya', 4],
      ['Kristen', 18]
    ];
    
    width = 550;
    height = 400;
    public dataTable: DataTable;

    listData: CustomTable;

  eventsLoad: Subject<void> = new Subject<void>();

  loadDataTable() {
    this.eventsLoad.next();
  }

    isLoadingTable = true;
    length = 100;
    pageSize = 10;
    pageSizeOptions: number[] = [5, 10, 25, 100];

    isScreenSmall: boolean;

    constructor(
        private router: Router,
        private dataService: DataService,
        public breakpointObserver: BreakpointObserver,
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
    }

    ngOnInit() {
        this.inisialisasiTable();
    }

    manageData(i, module) {

        if (module) {
            this.router.navigate(['/master-data/manage-akademik-mahasiswa/' + module.login]);
        } else {
            this.router.navigate(['/master-data/manage-akademik-mahasiswa']);
        }

    }

    ngAfterViewInit() {

    }

    inisialisasiTable() {
        this.listData = {
            is_action:false,
            filter: true,
            init_load: true,
            is_role: true,
            is_role_params:null,
            endpoint: "listFeeder",
            endpoint_local: "listFeeder",
            action_name: "",
            type: "",
            order: "",
            where: "",
            group: "",
            dynamic_header_field: "",
            dynamic_header_name: "", 
            dynamic_header_value: "",
            dynamic_header_type: "",
            dynamic_header_add_index: 0,
            filter_data: [
                {
                    id: "kode_prodi",
                    label: "Filter Data",
                    data_list: [],
                    type: "select",
                    is_filter: true,
                    value: null,
                    trigger: false,
                    trigger_id: null,
                    trigger_params: null,
                    first_index_selected: true,
                    api: {
                      endpoint: "/master/prodi",
                      where: "id_aktif='Y'",
                      prodi_role: {
                        param: "kode",
                        is_role: true,
                      },
                      id: "kode",
                      label: "prodi",
                    },
                  },
            ],
            header: [
                {
                    type: "",
                    label: "#",
                    class: "text-sm text-center border border-black-300 bg-gray-400 w-10",
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
                    label: "ANGKATAN",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "jenis",
                    filter: false,
                    filter_type: "text",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                },
                {
                    type: "",
                    label: "SITU",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "situ",
                    filter: false,
                    filter_type: "text",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                },
                {
                    tooltip:"",
                    type: "",
                    label: "FEEDER",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "feeder",
                    filter: false,
                    filter_type: "text",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                },
                {
                    tooltip: "",
                    type: "",
                    label: "CREATE",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "create",
                    filter: false,
                    filter_type: "text",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                },
                {
                    tooltip:"",
                    type: "",
                    label: "UPDATE",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "update",
                    filter: false,
                    filter_type: "text",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                },
                {
                    tooltip:"",
                    type: "",
                    label: "DELETE",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "delete",
                    filter: false,
                    filter_type: "select",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                },
                {
                    tooltip: "",
                    type: "",
                    label: "OTHER",
                    class: "text-sm text-center border border-black-300 bg-gray-400",
                    field: "other",
                    filter: false,
                    filter_type: "text",
                    filter_value: null,
                    sort: false,
                    sort_type: "",
                    data: [],
                }
            ],
            field: [
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "no",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "jenis",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "situ",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "feeder",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "create",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "update",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "delete",
                },
                {
                    type: "",
                    count_field: [],
                    class: "text-center border border-black-300",
                    field: "other",
                }
            ],
            action: [],
            data: [],
            sum: [
                {
                    type: "",
                    label: "Jumlah",
                    class: "text-right font-bold  ",
                    colspan: "2",
                    field: "",
                    value: 0,
                },
                {
                    type: "",
                    label: "",
                    class: "text-center font-bold",
                    colspan: "1",
                    field: "situ",
                    value: 0,
                },
                {
                    type: "",
                    label: "",
                    class: "text-center font-bold",
                    colspan: "1",
                    field: "feeder",
                    value: 0,
                },
                {
                    type: "",
                    label: "",
                    class: "text-center font-bold",
                    colspan: "1",
                    field: "create",
                    value: 0,
                },
                {
                    type: "",
                    label: "",
                    class: "text-center font-bold",
                    colspan: "1",
                    field: "update",
                    value: 0,
                },
                {
                    type: "",
                    label: "",
                    class: "text-center font-bold",
                    colspan: "1",
                    field: "delete",
                    value: 0,
                },
                {
                    type: "",
                    label: "",
                    class: "text-center font-bold",
                    colspan: "1",
                    field: "other",
                    value: 0,
                }
            ],
            not_pagination: false,
            export:[],
            feeder:[{
                label:"Kirim",
                api:"feeder",
                class:"btn btn-success",
                number_process:0
            },
            {
                label:"Tarik Data",
                api:"feeder",
                class:"btn btn-info",
                number_process:0
            }]
        };
    }
    // inisialisasiTable() {
    //     this.listData = {
    //         filter: false,
    //         init_load: true,
    //         is_role: false,
    //         is_role_params:null,
    //         endpoint: "listFeeder",
    //         endpoint_local: "listFeeder",
    //         action_name: "",
    //         type: "",
    //         order: "",
    //         where: "",
    //         group: "",
    //         dynamic_header_field: "",
    //         dynamic_header_name: "", 
    //         dynamic_header_value: "",
    //         dynamic_header_type: "",
    //         dynamic_header_add_index: 0,
    //         filter_data: [],
    //         header: [
    //             {
    //                 type: "",
    //                 label: "#",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400 w-10",
    //                 field: "no",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 type: "",
    //                 label: "ANGKATAN",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "jenis",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 type: "",
    //                 label: "SITU",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "situ",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 tooltip:"",
    //                 type: "",
    //                 label: "FEEDER",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "feeder",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 tooltip: "",
    //                 type: "",
    //                 label: "CREATE",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "create",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 tooltip:"",
    //                 type: "",
    //                 label: "UPDATE",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "update",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 tooltip:"",
    //                 type: "",
    //                 label: "DELETE",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "delete",
    //                 filter: false,
    //                 filter_type: "select",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             },
    //             {
    //                 tooltip: "",
    //                 type: "",
    //                 label: "OTHER",
    //                 class: "text-sm text-center border border-black-300 bg-gray-400",
    //                 field: "other",
    //                 filter: false,
    //                 filter_type: "text",
    //                 filter_value: null,
    //                 sort: false,
    //                 sort_type: "",
    //                 data: [],
    //             }
    //         ],
    //         field: [
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-center border border-black-300",
    //                 field: "no",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-left border border-black-300",
    //                 field: "jenis",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-left border border-black-300",
    //                 field: "situ",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-center border border-black-300",
    //                 field: "feeder",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-center border border-black-300",
    //                 field: "create",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-center border border-black-300",
    //                 field: "update",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-center border border-black-300",
    //                 field: "delete",
    //             },
    //             {
    //                 type: "",
    //                 count_field: [],
    //                 class: "text-center border border-black-300",
    //                 field: "other",
    //             }
    //         ],
    //         action: [],
    //         data: [],
    //         sum: [
    //             {
    //                 type: "",
    //                 label: "Jumlah",
    //                 class: "text-right font-bold  ",
    //                 colspan: "2",
    //                 field: "",
    //                 value: 0,
    //             },
    //             {
    //                 type: "",
    //                 label: "",
    //                 class: "text-center font-bold",
    //                 colspan: "1",
    //                 field: "situ",
    //                 value: 0,
    //             },
    //             {
    //                 type: "",
    //                 label: "",
    //                 class: "text-center font-bold",
    //                 colspan: "1",
    //                 field: "feeder",
    //                 value: 0,
    //             },
    //             {
    //                 type: "",
    //                 label: "",
    //                 class: "text-center font-bold",
    //                 colspan: "1",
    //                 field: "create",
    //                 value: 0,
    //             },
    //             {
    //                 type: "",
    //                 label: "",
    //                 class: "text-center font-bold",
    //                 colspan: "1",
    //                 field: "update",
    //                 value: 0,
    //             },
    //             {
    //                 type: "",
    //                 label: "",
    //                 class: "text-center font-bold",
    //                 colspan: "1",
    //                 field: "delete",
    //                 value: 0,
    //             },
    //             {
    //                 type: "",
    //                 label: "",
    //                 class: "text-center font-bold",
    //                 colspan: "1",
    //                 field: "other",
    //                 value: 0,
    //             }
    //         ],
    //         not_pagination: false,
    //         export:[],
    //         feeder:{
    //             api:"feeder",
    //             number_process:0
    //         }
    //     };
    // }
}
