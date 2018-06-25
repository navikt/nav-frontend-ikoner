export const RECEIVE_ICONS = 'RECEIVE_ICONS'

export interface IIconInterface {
    type: string;
    icons: any;
}

export function receiveIcons(icons: any): IIconInterface {
    return { type: RECEIVE_ICONS, icons }
}
