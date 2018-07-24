import {IconStyle} from "../redux/store-interfaces";

function iconStyleToString(iStyle : IconStyle) : string{
    return iStyle === IconStyle.FILLED ? "Filled" : "Line";
}

function iconStyle(style : IconStyle) : string{
    return style === IconStyle.FILLED ? `style=${iconStyleToString(style)}` : `style=${iconStyleToString(style)}`
}

function searchText(search :string | undefined) : string {
    return search ? `&search=${search}` : "";
}

function fetchInterval(fetchFrom: number, fetchTo:number) : string{
    return fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";
}

const LinkCreator = {
    fetchInterval,
    iconStyle,
    iconStyleToString,
    searchText,
};

export default LinkCreator;
