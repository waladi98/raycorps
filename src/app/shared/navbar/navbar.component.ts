import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive } from '@angular/core';
import { ROUTES } from '../.././sidebar/sidebar.component';
import { Router, ActivatedRoute, NavigationEnd, NavigationStart } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import {
    BreakpointObserver,
    Breakpoints,
    BreakpointState
} from '@angular/cdk/layout';
import { StorageService } from '../../core/services/storage.service';
import { AuthService } from '../../core/auth/auth.service';
import { finalize, takeUntil } from 'rxjs/operators';
import swal from 'sweetalert2';

//Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    collapse?: string;
    is_collapse?: boolean;
    children?: ChildrenItems[];
}


export interface ChildrenItems {
    path: string;
    title: string;
    icontype?: string;
    ab: string;
    type?: string;
}


//Menu Items
export const MENUS: RouteInfo[] = [
{
    path: '/master-data',
    title: 'Master Data',
    type: 'sub',
    icontype: 'storagel',
    collapse: 'master-data',
    is_collapse: false,
    children: [
        { path: 'institusi', title: 'Institusi', icontype: 'cottage', ab: 'I' },
        { path: 'kampus', title: 'Kampus', icontype: 'corporate_fare', ab: 'K' },
        { path: 'ruang', title: 'Ruang', icontype: 'weekend', ab: 'R' },
        { path: 'program', title: 'Program', icontype: 'format_list_bulleted', ab: 'P' },
        { path: 'fakultas-prodi', title: 'Fakultas dan Program Studi', icontype: 'format_list_bulleted', ab: 'FP' },
        { path: 'tahun-akademik', title: 'Tahun Akademik', icontype: 'edit_calendar', ab: 'TA' },
        { path: 'dosen', title: 'Dosen', icontype: 'groups', ab: 'D' },
        { path: 'kurikulum-mata-kuliah', title: 'Kurikulum Mata Kuliah', icontype: 'bookmarks', ab: 'KMK' },
        { path: 'pengguna', title: 'Pengguna', icontype: 'groups', ab: 'P' },
        { path: 'pimpinan', title: 'Pimpinan', icontype: 'groups', ab: 'P' },
        { path: 'mahasiswa', title: 'Mahasiswa', icontype: 'groups', ab: 'M' },
        { path: 'dosen-wali', title: 'Dosen Wali', icontype: 'groups', ab: 'DW' },
        { path: 'data-pribadi-mahasiswa', title: 'Data Pribadi Mahasiswa', icontype: 'school', ab: 'DPM' },
        { path: 'prestasi-dan-sanksi', title: 'Prestasi dan Sanksi', icontype: 'military_tech', ab: 'PS' },
        { path: 'export-data-mahasiswa', title: 'Export Data Mahasiswa', icontype: 'file_upload', ab: 'EDM' },
        { path: 'rekening-institusi', title: 'Rekening Institusi', icontype: 'payments', ab: 'RI' },
        { path: 'biaya-dan-potongan', title: 'Biaya dan Potongan', icontype: 'payments', ab: 'BP' },
        { path: 'setup-wisuda', title: 'Setup Wisuda', icontype: 'construction', ab: 'SW' },
        { path: 'jumlah-lulusan', title: 'Jumlah Lulusan', icontype: 'poll', ab: 'JL' },
        { path: 'tracer-study-alumni', title: 'Tracer Study Alumni', icontype: 'reduce_capacity', ab: 'TSA' },
        { path: 'jurnal', title: 'Jurnal', icontype: 'import_contacts', ab: 'J' }
    ]
},
{
    path: '/registrasi',
    title: 'Registrasi',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'registrasi',
    children: [
        { path: 'no', title: 'Pengisian KRS', icontype: 'edit_note', ab: 'P' },
        { path: 'no', title: 'Status Perwalian', icontype: 'verified_user', ab: 'SP' },
        { path: 'no', title: 'Cuti Akademik', icontype: 'content_cut', ab: 'CA' },
        { path: 'no', title: 'Lulus /Keluar', icontype: 'change_circle', ab: 'LK' },
        { path: 'no', title: 'Drop Out', icontype: 'follow_the_signs', ab: 'DO' },
        { path: 'no', title: 'Pengajuan 0 SKS', icontype: 'difference', ab: 'PS' },
        { path: 'no', title: 'Rekap Perwalian Perkelas', icontype: 'library_books', ab: 'RP' },
        { path: 'no', title: 'Rekap Perwalian Per MK', icontype: 'library_books', ab: 'RP' },
        { path: 'no', title: 'Rekap Perwalian Per Prodi', icontype: 'library_books', ab: 'RP' },
        { path: 'no', title: 'Rekap Perwalian Per Dosen Wali', icontype: 'library_books', ab: 'RP' }
    ]
},
{
    path: '/perkuliahan',
    title: 'Perkulihan',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'perkuliahan',
    children: [
        { path: 'jadwal-perkuliahan', title: 'Jadwal Perkuliahan', icontype: 'edit_note', ab: 'P' },
        { path: 'hari-libur-nasional', title: 'Hari Libur Nasional', icontype: 'edit_note', ab: 'P' },
        { path: 'dispensasi-kehadiran-dosen', title: 'Dispensasi Kehadiran Dosen', icontype: 'edit_note', ab: 'P' },
        { path: 'peserta-kuliah', title: 'Peserta Kuliah', icontype: 'edit_note', ab: 'P' },
        { path: 'presensi-perkuliahan', title: 'Presensi Perkuliahan', icontype: 'edit_note', ab: 'P' },
        { path: 'monitoring-kuliah', title: 'Monitoring Kuliah', icontype: 'edit_note', ab: 'P' },
        { path: 'laporan-kehadiran-dosen', title: 'Laporan Kehadiran Dosen', icontype: 'edit_note', ab: 'P' },
        { path: 'laporan-kehadiran-mahasiswa', title: 'Laporan kehadiran mahasiswa', icontype: 'edit_note', ab: 'P' },
        { path: 'rekap-kehadiran-mahasiswa', title: 'Rekap kehadiran mahasiswa', icontype: 'edit_note', ab: 'P' },
        { path: 'surat-presensi-mahasiswa', title: 'Surat presensi mahasiswa', icontype: 'edit_note', ab: 'P' },
        { path: 'surat-pemberitahuan-kuliah', title: 'Surat pemberitahuan kuliah', icontype: 'edit_note', ab: 'P' },
        { path: 'surat-progres-pbm', title: 'Surat Progres PBM', icontype: 'edit_note', ab: 'P' },
        { path: 'surat-evaluasi-pbm', title: 'Surat evaluasi PBM', icontype: 'edit_note', ab: 'P' },
        { path: 'jadwal-praktikum-mahasiswa', title: 'Jadwal praktikum mahasiswa', icontype: 'edit_note', ab: 'P' },
    ]
},
{
    path: '/ujian',
    title: 'Ujian',
    type: 'sub',
    icontype: 'content_paste',
    collapse: 'ujian',
    children: [
        { path: 'dashboard-ujian', title: 'Dashboard Ujian', icontype: 'edit_note', ab: 'P' },
        { path: 'jadwal-ujian', title: 'Jadwal Ujian', icontype: 'edit_note', ab: 'P' },
        { path: 'surat-pemeberitahuan-ujian', title: 'Surat Pemberitahuan Ujian', icontype: 'edit_note', ab: 'P' },
        { path: 'daftar-hadir-ujian', title: 'Daftar Hadir Ujian', icontype: 'edit_note', ab: 'P' },
        { path: 'kebutuhan-ruang-ujian', title: 'Kebutuhan Ruang Ujian', icontype: 'edit_note', ab: 'P' },
        { path: 'surat-hasil-umpan-balik', title: 'Surat Hasil Umpan Balik', icontype: 'edit_note', ab: 'P' },
        { path: 'ujian-susulan', title: 'Ujian Susulan', icontype: 'edit_note', ab: 'P' },
    ]
}
    , {
        path: '/components',
        title: 'Components',
        type: 'sub',
        icontype: 'apps',
        collapse: 'components',
        children: [
            { path: 'buttons', title: 'Buttons', icontype: 'content_paste', ab: 'B' },
            { path: 'grid', title: 'Grid System', icontype: 'content_paste', ab: 'GS' },
            { path: 'panels', title: 'Panels', icontype: 'content_paste', ab: 'P' },
            { path: 'sweet-alert', title: 'Sweet Alert', icontype: 'content_paste', ab: 'SA' },
            { path: 'notifications', title: 'Notifications', icontype: 'content_paste', ab: 'N' },
            { path: 'icons', title: 'Icons', icontype: 'content_paste', ab: 'I' },
            { path: 'typography', title: 'Typography', icontype: 'content_paste', ab: 'T' }
        ]
    }
    // , {
    //     path: '/forms',
    //     title: 'Forms',
    //     type: 'sub',
    //     icontype: 'content_paste',
    //     collapse: 'forms',
    //     children: [
    //         { path: 'regular', title: 'Regular Forms', icontype: 'content_paste', ab: 'RF' },
    //         { path: 'extended', title: 'Extended Forms', icontype: 'content_paste', ab: 'EF' },
    //         { path: 'validation', title: 'Validation Forms', icontype: 'content_paste', ab: 'VF' },
    //         { path: 'wizard', title: 'Wizard', icontype: 'content_paste', ab: 'W' }
    //     ]
    // }, {
    //     path: '/tables',
    //     title: 'Tables',
    //     type: 'sub',
    //     icontype: 'grid_on',
    //     collapse: 'tables',
    //     children: [
    //         { path: 'regular', title: 'Regular Tables', icontype: 'content_paste', ab: 'RT' },
    //         { path: 'extended', title: 'Extended Tables', icontype: 'content_paste', ab: 'ET' },
    //         { path: 'datatables.net', title: 'Datatables.net', icontype: 'content_paste', ab: 'DT' }
    //     ]
    // }, {
    //     path: '/maps',
    //     title: 'Maps',
    //     type: 'sub',
    //     icontype: 'place',
    //     collapse: 'maps',
    //     children: [
    //         { path: 'google', title: 'Google Maps', icontype: 'content_paste', ab: 'GM' },
    //         { path: 'fullscreen', title: 'Full Screen Map', icontype: 'content_paste', ab: 'FSM' },
    //         { path: 'vector', title: 'Vector Map', icontype: 'content_paste', ab: 'VM' }
    //     ]
    // }, {
    //     path: '/widgets',
    //     title: 'Widgets',
    //     type: 'link',
    //     icontype: 'widgets'

    // }, {
    //     path: '/charts',
    //     title: 'Charts',
    //     type: 'link',
    //     icontype: 'timeline'

    // }, {
    //     path: '/calendar',
    //     title: 'Calendar',
    //     type: 'link',
    //     icontype: 'date_range'
    // }, {
    //     path: '/pages',
    //     title: 'Pages',
    //     type: 'sub',
    //     icontype: 'image',
    //     collapse: 'pages',
    //     children: [
    //         { path: 'pricing', title: 'Pricing', icontype: 'content_paste', ab: 'P' },
    //         { path: 'timeline', title: 'Timeline Page', icontype: 'content_paste', ab: 'TP' },
    //         { path: 'login', title: 'Login Page', icontype: 'content_paste', ab: 'LP' },
    //         { path: 'register', title: 'Register Page', icontype: 'content_paste', ab: 'RP' },
    //         { path: 'lock', title: 'Lock Screen Page', icontype: 'content_paste', ab: 'LSP' },
    //         { path: 'user', title: 'User Page', icontype: 'content_paste', ab: 'UP' }
    //     ]
    // }
];

const misc: any = {
    navbar_menu_visible: 0,
    active_collapse: true,
    disabled_collapse_init: 0,
};

declare var $: any;
@Component({
    selector: 'app-navbar-cmp',
    templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
    private listTitles: any[];
    location: Location;
    mobile_menu_visible: any = 0;
    private nativeElement: Node;
    private toggleButton: any;
    private sidebarVisible: boolean;
    private _router: Subscription;
    public menuItems: any[];
    storageService = new StorageService();

    @ViewChild('app-navbar-cmp', { static: false }) button: any;
    isScreenSmall: boolean;

    id_menu_active = null;
    constructor(
        location: Location,
        private renderer: Renderer2,
        private element: ElementRef,
        private router: Router,
        public breakpointObserver: BreakpointObserver,
        private _storageService: StorageService,
        private authService: AuthService,
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
        this.location = location;
        this.nativeElement = element.nativeElement;
        this.sidebarVisible = false;
    }
    minimizeSidebar() {
        const body = document.getElementsByTagName('body')[0];

        if (misc.sidebar_mini_active === true) {
            body.classList.remove('sidebar-mini');
            misc.sidebar_mini_active = false;

        } else {
            setTimeout(function () {
                body.classList.add('sidebar-mini');

                misc.sidebar_mini_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }
    hideSidebar() {
        const body = document.getElementsByTagName('body')[0];
        const sidebar = document.getElementsByClassName('sidebar')[0];

        if (misc.hide_sidebar_active === true) {
            setTimeout(function () {
                body.classList.remove('hide-sidebar');
                misc.hide_sidebar_active = false;
            }, 300);
            setTimeout(function () {
                sidebar.classList.remove('animation');
            }, 600);
            sidebar.classList.add('animation');

        } else {
            setTimeout(function () {
                body.classList.add('hide-sidebar');
                // $('.sidebar').addClass('animation');
                misc.hide_sidebar_active = true;
            }, 300);
        }

        // we simulate the window Resize so the charts will get updated in realtime.
        const simulateWindowResize = setInterval(function () {
            window.dispatchEvent(new Event('resize'));
        }, 180);

        // we stop the simulation of Window Resize after the animations are completed
        setTimeout(function () {
            clearInterval(simulateWindowResize);
        }, 1000);
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);

        this.listTitles = ROUTES.filter(listTitle => listTitle);

        const navbar: HTMLElement = this.element.nativeElement;
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
        if (body.classList.contains('sidebar-mini')) {
            misc.sidebar_mini_active = true;
        }
        if (body.classList.contains('hide-sidebar')) {
            misc.hide_sidebar_active = true;
        }
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            this.sidebarClose();

            const $layer = document.getElementsByClassName('close-layer')[0];
            if ($layer) {
                $layer.remove();
            }
        });
    }
    onResize(event) {
        if ($(window).width() > 991) {
            return false;
        }
        return true;
    }
    sidebarOpen() {
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function () {
            toggleButton.classList.add('toggled');
        }, 500);
        body.classList.add('nav-open');
        setTimeout(function () {
            $toggle.classList.add('toggled');
        }, 430);

        var $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');


        if (body.querySelectorAll('.main-panel')) {
            document.getElementsByClassName('main-panel')[0].appendChild($layer);
        } else if (body.classList.contains('off-canvas-sidebar')) {
            document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
        }

        setTimeout(function () {
            $layer.classList.add('visible');
        }, 100);

        $layer.onclick = function () { //asign a function
            body.classList.remove('nav-open');
            this.mobile_menu_visible = 0;
            this.sidebarVisible = false;

            $layer.classList.remove('visible');
            setTimeout(function () {
                $layer.remove();
                $toggle.classList.remove('toggled');
            }, 400);
        }.bind(this);

        body.classList.add('nav-open');
        this.mobile_menu_visible = 1;
        this.sidebarVisible = true;
    };
    sidebarClose() {
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        var $layer = document.createElement('div');
        $layer.setAttribute('class', 'close-layer');

        this.sidebarVisible = false;
        body.classList.remove('nav-open');
        // $('html').removeClass('nav-open');
        body.classList.remove('nav-open');
        if ($layer) {
            $layer.remove();
        }

        setTimeout(function () {
            $toggle.classList.remove('toggled');
        }, 400);

        this.mobile_menu_visible = 0;
    };
    sidebarToggle() {
        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
    }

    getTitle() {
        var titlee = this.location.prepareExternalUrl(this.location.path());
        if (titlee.charAt(0) === '#') {
            titlee = titlee.slice(1);
        }
        for (let i = 0; i < this.listTitles.length; i++) {
            if (this.listTitles[i].type === "link" && this.listTitles[i].path === titlee) {
                return this.listTitles[i].title;
            } else if (this.listTitles[i].type === "sub") {
                for (let j = 0; j < this.listTitles[i].children.length; j++) {
                    let subtitle = this.listTitles[i].path + '/' + this.listTitles[i].children[j].path;
                    // console.log(subtitle)
                    // console.log(titlee)
                    if (subtitle === titlee) {
                        return this.listTitles[i].children[j].title;
                    }
                }
            }
        }
        return 'Dashboard';
    }
    getPath() {
        return this.location.prepareExternalUrl(this.location.path());
    }

    onHoverMenu(index) {
        for (let i = 0; i < this.menuItems.length; i++) {
            this.menuItems[i].is_collapse = false;
        }

        if (index >= 0) {
            this.menuItems[index].is_collapse = true;
        }
    }

    logout() {

        this.authService
            .signOut()
            .pipe(
                finalize(() => {
                    swal.fire({
                        title: "Logout !",
                        text: "I will close in 1 seconds.",
                        timer: 1000,
                        showConfirmButton: false
                    });

                    setTimeout(() => {
                        this._storageService.remove('list_kelompok');
            this._storageService.remove('menu');
            this._storageService.remove('username');
            this._storageService.remove('kelompok');
            this._storageService.remove('user_token');
            this._storageService.remove('peserta_id');
            this.router.navigate(['/auth/login']);
                    }, 1000);
                })
            )
            .subscribe(
                (data) => {
                    console.log(data);
                },
                (error) => {
                    console.log(error);
                }
            );

        console.log('logout');
    }

    clickMenu(id) {
        var element = document.getElementById(id);
        element.classList.remove("show");
    }

    clickMenuActive(id) {
        if (this.id_menu_active) {
            var element = document.getElementById(this.id_menu_active);
            element.classList.remove("show");
        }
        this.id_menu_active = id;
    }
}
