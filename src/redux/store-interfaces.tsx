export interface IconsStore {
    fetching: boolean,
        icons: Icons,
        lastUpdated?: Date,
        searchText: string,
        selectedIcon?: Icon,
        iconColor: string,
}

export interface Store{
    iconsStore: IconsStore
}

export interface Icon{
    title: string,
    fileName: string,
    link: string,
}

export type Icons = Icon[];
export type SearchText = string;