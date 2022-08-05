export interface Province {
    id: string;
    country_code: string;
    prov_code: string;
    prov_name: string;
}
export interface District {
    id: string;
    country_code: string;
    province_id: number;
    district_code: string;
    district_name: string;
}
export interface SubDistrict {
    id: string;
    country_code: string;
    province_id: number;
    district_id: number;
    sub_district_code: string;
    sub_district_name: string;
}
export interface UrbanVillage {
    id: string;
    country_code: string;
    province_id: number;
    district_id: number;
    sub_district_id: number;
    subsub_district_code: string;
    subsub_district_name: string;
    postal_code: string;
}