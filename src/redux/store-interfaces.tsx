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
    filename: string,
    link: string,
}

export type Icons = Icon[];
export type SearchText = string;
export type IconType = 'inList' | 'inPanel';
