/*
    Interfaces
 */
import { IconExpanded, Icons, IconStyle, Tags } from "./store-interfaces";

export interface ReceiveIconsAction {
  type: string;
  icons: Icons;
  numberOfIcons: number;
}

export interface ReceiveTagsAction {
  type: string;
  tags: Tags;
}

export interface SearchTextAction {
  type: string;
  searchText: string;
}

export interface SelectedIconAction {
  type: string;
  icon: IconExpanded | undefined;
}

export interface SelectedIconIndexAction {
  type: string;
  index: number;
}

export interface IconColorAction {
  type: string;
  iconColor: string;
}

export interface IconColorBackgroundAction {
  type: string;
  iconBackgroundColor: string;
}

export interface IconColorStyle {
  type: string;
  iconStyle: IconStyle;
}

export interface FetchingIconsAction {
  type: string;
}

export interface FetchingInterval {
  type: string;
  fetchFrom: number;
  fetchTo: number;
}

export interface ChosenExtensions {
  type: string;
  extension: string;
}
