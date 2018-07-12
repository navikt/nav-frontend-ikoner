import {IconStyle} from "../redux/store-interfaces";

function iconStyle(iStyle : IconStyle) : string{
    return iStyle === IconStyle.FILLED ? "style=Filled" : "style=Line"
}

function searchText(search :string) : string {
    return searchText ? `&search=${searchText}` : "";
}

function fetchInterval(fetchFrom: number, fetchTo:number) : string{
    return fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";
}

const LinkCreator = {
    fetchInterval,
    iconStyle,
    searchText,
};

export default LinkCreator;
