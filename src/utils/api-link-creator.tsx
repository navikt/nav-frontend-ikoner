import Language from "../language/norwegian";
import {IconStyle} from "../redux/store-interfaces";

function iconStyleToString(iStyle: IconStyle): string {
    return iStyle === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON;
}

function iconStyle(style: IconStyle): string {
    return `style=${iconStyleToString(style)}`;
}

function searchText(search: string): string {
    return search ? `&search=${search}` : "";
}

function fetchInterval(fetchFrom: number, fetchTo: number): string {
    return fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";
}

const LinkCreator = {
    fetchInterval,
    iconStyle,
    iconStyleToString,
    searchText,
};

export default LinkCreator;
