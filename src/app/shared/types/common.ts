import { FormType } from './enum';

export interface Pagination<T> {
    aData: T;
    iTotalDisplayRecords: number;
    iTotalRecords: number;
}

export interface CommonReference {
    id: any;
    name: any;
    translate_id?: string;
}

export interface FormOptions {
    id: any;
    formType: FormType;
    title: string;
    data?: any;
    emp_profile_id: number;
}

export interface FormResponse {
    result: any;
    message: string;
    code?:string;
    translateId: string;
    token?: string;
    title?: string;
    buttonLabel?: string;
    redirect?: string;
}

export interface Location {
    id: number;
    locCode: string;
    locName: string;
    postalCode?: string;
    name?: string;
}
