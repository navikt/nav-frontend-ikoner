import Config from "../appconfig";
import {IconExpanded, IconStyle} from "../redux/store-interfaces";

function iconStyleToString(style : IconStyle) : string{
    return style === IconStyle.FILLED ? "Filled" : "Line";
}

function iconStyle(style : IconStyle) : string{
    return style === IconStyle.FILLED ? `style=${iconStyleToString(style)}` : `style=${iconStyleToString(style)}`
}
function iconDisplay(style: IconStyle, iconColor: string, selectedIcon: IconExpanded){
    return `${Config.NAV_ICONS_API_DISPLAY_ICON_LINK}/${iconStyleToString(style)}/${iconColor}/${selectedIcon.bestLocation.filename}`.replace("#", "%23");
}

function iconSearchText(search? :string) : string {
    return search ? `&search=${search}` : "";
}

function iconFetchInterval(fetchFrom: number, fetchTo:number) : string{
    return fetchFrom !== undefined || fetchTo !== undefined ? `&from=${fetchFrom}&to=${fetchTo}` : "";
}

const LinkCreator = {
    iconDisplay,
    iconFetchInterval,
    iconSearchText,
    iconStyle,
    iconStyleToString,
};

export default LinkCreator;
