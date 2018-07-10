export interface IconsStore {
    fetching: boolean,
    icons: Icons,
    lastUpdated?: Date,
    searchText: string,
    selectedIcon?: Icon,
    iconColor: string,
    iconStyle: IconStyle,
    fetchHasMore: boolean
    fetchFrom: number,
    fetchTo: number,
}

export interface Store{
    iconsStore: IconsStore
}

export interface Icon{
    title: string,
    filename: string,
    extension:string,
    link: string,
}

export type Icons = Icon[];
export type SearchText = string;
export enum IconType {
    IN_LIST,
    IN_PANEL
};
export enum IconStyle {
    FILLED,
    LINE
};
