import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeStyle, SafeScript, SafeUrl, SafeResourceUrl } from '@angular/platform-browser';


declare interface DataTable {
    headerRow: string[];
    footerRow: string[];
    dataRows: string[][];
}

declare const $: any;

@Component({
    selector: 'app-master-drop-out',
    templateUrl: 'drop-out.component.html'
})



export class DropOutComponent implements OnInit {
    public dataTable: DataTable;

    tahun_akademik = [
        { value: '20021', viewValue: 'Semester Gasal 2040 - 2041' },
        { value: '20331', viewValue: 'Semester Gasal 2033 - 2034' },
        { value: '20330', viewValue: 'Semester Transisi 2033 - 2034' },
        { value: '20304', viewValue: 'Semester Transisi 2030 - 2031' },
        { value: '20303', viewValue: 'Semester Sisipan 2030 - 2031' },
        { value: '20231', viewValue: 'Semester Gasal 2023 - 2024' },
        { value: '20221', viewValue: 'Semester Gasal 2023 - 2024' },
    ];

    programs = [
        { value: 'all', viewValue: 'Tampilkan Semua' },
        { value: 'KER', viewValue: 'KER - Kerjasama' },
        { value: 'NON', viewValue: 'NON - Reguler Sore' },
        { value: 'REG', viewValue: 'REG - Reguler Pagi' },
        { value: 'TES', viewValue: 'TES - Program Tes' },
    ];

    prodis = [
        { value: 'all', viewValue: 'Tampilkan Semua' },
        { value: '110', viewValue: '110 - Kedokteran' },
        { value: '111', viewValue: '111 - Pendidikan Dokter Gigi' },
        { value: '160', viewValue: '160 - Psikologi' },
        { value: '301', viewValue: '301 - Teknik Kimia' },
        { value: '303', viewValue: '303 - Teknik Sipil' },
        { value: '304', viewValue: '304 - Teknik Informatika' },
        { value: '444', viewValue: '444 - Prodi Tes' },
    ];

    listData = [];
    tanggalPost = null;
    srcdoc = null;
    constructor(
        private router: Router,
        private sanitizer: DomSanitizer
    ) {

    }

    public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
        switch (type) {
            case 'html': return this.sanitizer.bypassSecurityTrustHtml(value);
            case 'style': return this.sanitizer.bypassSecurityTrustStyle(value);
            case 'script': return this.sanitizer.bypassSecurityTrustScript(value);
            case 'url': return this.sanitizer.bypassSecurityTrustUrl(value);
            case 'resourceUrl': return this.sanitizer.bypassSecurityTrustResourceUrl(value);
            default: throw new Error(`Invalid safe type specified: ${type}`);
        }
    }

    createURL() {
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://pmb.yarsi.ac.id/prototipe/mutu/spmi_ref_hasil_audit.php');
    }

    setMahasiswa() {
        this.srcdoc = this.sanitizer.bypassSecurityTrustResourceUrl('https://pmb.yarsi.ac.id/prototipe/mutu/spmi_ref_hasil_audit.php');
    }

    ngOnInit() {
        this.listData = [{
            nomor: '1',
            npm: '123',
            nama: 'nama',
            status: 'tidak aktif',
            nonaktif: '12',
            ipk: '3',
            sks: '23',
            prodi: 'prodi',
            program: 'program',
            dosenwali: 'dosenwali',
            skdropout: '12',
            tgldropout: '12/1/2012',
        }];
    }

    manageData(module) {
        if (module) {
            this.router.navigate(['/registrasi/drop-out/' + module.kode]);
        } else {
            this.router.navigate(['/registrasi/drop-out']);
        }
    }

    ngAfterViewInit() {

    }
}
