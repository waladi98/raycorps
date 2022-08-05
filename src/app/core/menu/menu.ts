
export interface SubMenu {
    isShow: boolean;
    subMenu: any[];
}

export interface MainMenu {
    id: number;
    color: string;
    cols: number;
    rows: number;
    text: string;
    fontClass: string;
    notification: number;
    icon: string;
    appID: string;
    link?: string;
    isActive: boolean;
}
