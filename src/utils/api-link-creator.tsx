import {IconStyle} from "../redux/store-interfaces";

function iconStyle(iStyle : IconStyle) : string{
    return iStyle === IconStyle.FILLED ? "style=Filled" : "style=Line"
}

function searchText(search :string) : string {
    return search ? `&search=${search}` : "";
}

function fetchInterval(fetchFrom: number, fetchTo:number) : string{
    return fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom.toString()}&to=${fetchTo.toString()}` : "";
}

const LinkCreator = {
    fetchInterval,
    iconStyle,
    searchText,
};

export default LinkCreator;