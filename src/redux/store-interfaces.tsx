export interface IconsStore {
    fetching: boolean,
    icons: Icons,
    lastUpdated?: Date,
    searchText: string,
    selectedIcon?: IconBasic,
    iconColor: string,
    iconStyle: IconStyle,
    fetchHasMore: boolean
    fetchFrom: number,
    fetchTo: number,
}

export interface Store{
    iconsStore: IconsStore
}

export interface Location{
    filename:string,
    extension: string,
    path: string,
    size: string,
    url: string,
}

export interface Tag{
    id: string,
    text: string,
}

export interface IconExpanded{
    title: string,
    description: string,
    bestLocation: Location,
    locations: Location[],
    tags: Tag[],
    tagsSuggestions: Tag[],
}

export interface IconBasic{
    title: string,
    filename: string,
    extension:string,
    link: string,
}

export type Icons = IconBasic[];
export type SearchText = string;
export enum IconType {
    IN_LIST,
    IN_PANEL
};
export enum IconStyle {
    FILLED,
    LINE
};
