import { StorageService } from '../services/storage.service';

export class User {
    empSite: string;
    empSubArea: number;
    empno: number;
    expired: number;
    flagApp: string;
    group: number;
    images: string;
    name: string;
    nama: string;
    section: string;
    userID: string;
    username: string;
    email: string;
    avatar: string;
    status: string;
    photo?: string;
    job_title: string;

    constructor(
        empSite: string = '-',
        empSubArea: number = 0,
        empno: number = 0,
        expired: number = 0,
        flagApp: string = '-',
        group: number = 0,
        images: string = '-',
        name: string = '-',
        nama: string='-',
        section: string = '-',
        userID: string = '-',
        username: string = '-',
        email: string = '-',
        job_title: string='-'
    ) {
        const storage = new StorageService();
        if (storage.get('token')) {
            Object.keys(User).forEach((val) => {
                this[val] = storage.get(val);
            });
        } else {
            this.empSite = empSite;
            this.empSubArea = empSubArea;
            this.empno = empno;
            this.expired = expired;
            this.flagApp = flagApp;
            this.group = group;
            this.images = images;
            this.name = name;
            this.nama = nama;
            this.section = section;
            this.userID = userID;
            this.username = username;
            this.email = email;
            this.avatar = this.images;
            this.status = 'online';
            this.job_title=job_title
        }
    }
}

export class Profiles {
    nik: string;
    nik_atasan: string;
    grade: string;
    positionID: string;
    emp_profile_id: number;
    hired_date: string;
    flag_app: string;
    effective_date: string;
    fullname: string;
    department: string;
    division: string;
    sub_area: string;
    job_code: string;
    job_code_description: string;
    current_position: string;
    photo_address?: string;
}

export interface Auth {
    token: string;
    type: string;
}

export interface Logout {
    status: string;
}
