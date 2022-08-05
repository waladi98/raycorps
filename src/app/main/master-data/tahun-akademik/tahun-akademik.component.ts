import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { DataService } from "../../../core/services/data.service";
import { finalize, map, takeUntil } from "rxjs/operators";
import {
  BreakpointObserver,
  Breakpoints,
  BreakpointState,
} from "@angular/cdk/layout";
import { PageEvent } from "@angular/material/paginator";

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: string[][];
}

declare const $: any;

@Component({
  selector: "app-master-tahun-akademik",
  templateUrl: "tahun-akademik.component.html",
})
export class TahunAkademikComponent implements OnInit {
  public dataTable: DataTable;

  listData = {
    header: [],
    field: [],
    action: [],
    data: [],
  };
  isLoadingTable = true;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  isScreenSmall: boolean;

  constructor(
    private router: Router,
    private dataService: DataService,
    public breakpointObserver: BreakpointObserver
  ) {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isScreenSmall = true;
          console.log("Matches small viewport or handset in portrait mode");
        } else {
          this.isScreenSmall = false;
        }
      });
  }

  ngOnInit() {
    this.inisialisasiTable();
    this.loadData(0);
  }

  manageData(i, module) {
    if (module) {
      this.router.navigate([
        "/master-data/manage-tahun-akademik/" + module.kode,
      ]);
    } else {
      this.router.navigate(["/master-data/manage-tahun-akademik"]);
    }
  }

  ngAfterViewInit() {}

  inisialisasiTable() {
    this.listData = {
      header: [
        {
          label: "#",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "no",
        },
        {
          label: "Tahun",
          class: "text-sm text-left border border-black-300 bg-gray-400 w-30",
          field: "kode",
        },
        {
          label: "Nama",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: "tahun_akademik",
        },
        {
          label: "KRS",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Ubah KRS",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Masa Kuliah",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Masa UTS",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Masa UAS",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Buka",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Keuangan",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "Tutup",
          class: "text-sm text-left border border-black-300 bg-gray-400",
          field: null,
        },
        {
          label: "NA",
          class: "text-sm text-center border border-black-300 bg-gray-400 w-20",
          field: "aktif",
        },
        {
          label: "Aksi",
          class:
            "text-sm disabled-sorting text-center w-20 border border-black-300 bg-gray-400",
          field: "action",
        },
      ],
      field: [
        {
          class: "text-center border border-black-300",
          field: "no",
        },
        {
          class: "text-left border border-black-300",
          field: "kode",
        },
        {
          class: "text-left border border-black-300",
          field: "tahun_akademik",
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: null,
        },
        {
          class: "text-left border border-black-300",
          field: "aktif",
        },
        {
          class: "text-center border border-black-300",
          field: "action",
        },
      ],
      action: [
        {
          action_name: "manageData",
          icon: "fa fa-edit",
        },
      ],
      data: [],
    };
  }

  onChangePaginator(event: PageEvent): void {
    this.pageSize = event.pageSize;
    console.log(event);
    this.loadData(event.pageIndex + 1);
  }

  loadData(page: number): void {
    this.isLoadingTable = true;
    this.dataService
      .getPostRequest<any>("/master/tahunAkademik", {
        offset: page,
        limit: this.pageSize,
      })
      .pipe(
        map((response) => response),
        finalize(() => setTimeout(() => (this.isLoadingTable = false), 1000))
      )
      .subscribe(
        (response) => {
          this.listData.data = response.result;
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
