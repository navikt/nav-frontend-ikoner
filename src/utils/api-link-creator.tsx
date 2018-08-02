import Config from "../appconfig";
import Language from "../language/norwegian";
import { IconExpanded, IconStyle } from "../redux/store-interfaces";

export function iconStyleToString(style: IconStyle): string {
  return style === IconStyle.FILLED ? Language.FILLED_ICON : Language.LINE_ICON;
}

export function iconStyle(style: IconStyle): string {
  return `style=${iconStyleToString(style)}`;
}

export function iconDisplay(
  style: IconStyle,
  color: string,
  selectedIcon: IconExpanded
) {
  return `${Config.NAV_ICONS_API_DISPLAY_ICON_LINK}/${iconStyleToString(
    style
  )}/${color}/${selectedIcon.bestLocation.filename}`.replace("#", "%23");
}

export function iconDownload(
  style: IconStyle,
  color: string,
  selectedIcon: IconExpanded,
  chosenExtensions: string[]
) {
  return `${Config.NAV_ICONS_API_LINK}/icon/download/${iconStyleToString(
    style
  )}/${color}/${selectedIcon.title}/${chosenExtensions.join(",")}/`.replace(
    "#",
    "%23"
  );
}

export function iconCDNRelative(
  style: IconStyle,
  color: string,
  selectedIcon: IconExpanded,
  extension: string
) {
  return `${Config.NAV_ICONS_API_DISPLAY_ICON_LINK}/${iconStyleToString(
    style
  )}/${color}/${selectedIcon.title}.${extension}`.replace("#", "%23");
}

export function iconSearchText(search?: string): string {
  return search ? `&search=${encodeURI(search)}` : "";
}

export function iconFetchInterval(fetchFrom: number, fetchTo: number): string {
  return fetchFrom !== undefined || fetchTo !== undefined
    ? `&from=${fetchFrom}&to=${fetchTo}`
    : "";
}
