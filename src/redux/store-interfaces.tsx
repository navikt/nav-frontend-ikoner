export interface IconsStore {
    fetchingCounter: number,
    fetchHasMore: boolean
    fetchFrom: number,
    fetchTo: number,
    icons: Icons,
    iconColor: string,
    iconStyle: IconStyle,
    lastUpdated?: Date,
    searchText: string,
    selectedIcon?: IconExpanded,
    selectedIconIndex: number,
    tags: Tags,
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
    id: string,
    title: string,
    description: string,
    bestLocation: Location,
    locations: Location[],
    tags: Tag[],
    tagsSuggestions: Tag[],
}

export interface IconBasic{
    id: string,
    title: string,
    extension:string,
    link: string,
}

export interface IconsResult {
    icons: Icons;
    numberOfIcons: number;
}

export type Tags = Tag[];
export type Icons = IconBasic[];
export enum IconType {
    IN_LIST,
    IN_PANEL
};
export enum IconStyle {
    FILLED,
    LINE
};
