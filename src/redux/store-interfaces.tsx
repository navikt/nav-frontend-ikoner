export interface Store{
    iconsStore:{
        fetching: boolean,
        icons: Icons,
        lastUpdated: Date,
        searchText: string,
        selectedIcon: Icon,
    }
}


export interface Icon{
    title: string,
    fileName: string,
    link: string,
}

export type Icons = Icon[];
export type SearchText = string;