import * as React from "react";
import * as Redux from "react-redux";
import {
  ColorPickerType,
  IconExpanded,
  IconStyle,
  Store
} from "../../../redux/store-interfaces";
import { iconDisplay } from "../../../utils/api-link-creator";
import IconColorPicker from "../../side-panel/icon-display/icon-color-picker";
import IconContrastRatio from "../../side-panel/icon-display/icon-contrast-ratio";
import "./icon-in-panel.less";
import IconUnknownExtension from "./icon-unknown-extension";

interface PropTypes {
  iconStyle: IconStyle;
  iconBackgroundColor: string;
  iconColor: string;
  selectedIcon: IconExpanded;
}

function IconInPanel(props: PropTypes) {
  const { selectedIcon, iconBackgroundColor, iconColor, iconStyle } = props;
  const iconLink =
    iconColor !== "original" && selectedIcon.bestLocation.extension === "svg"
      ? `url(${iconDisplay(iconStyle, iconColor, selectedIcon)})`
      : `url(${selectedIcon.bestLocation.url})`;
  const extension = selectedIcon.bestLocation.extension;
  const backgroundColor =
    iconBackgroundColor !== "original" ? iconBackgroundColor : "white";
  const backgroundImage =
    extension === "svg" || extension === "png" ? iconLink : undefined;
  const style = {
    backgroundColor,
    backgroundImage
  };

  return (
    <div className="icon-in-panel" style={style}>
      <IconUnknownExtension extension={selectedIcon.bestLocation.extension} />
      {selectedIcon.bestLocation.extension === "svg" && (
        <>
          <div className="icon-color-picker-container">
            <div className="icon-color-picker-box" />
            <IconColorPicker type={ColorPickerType.FOREGROUND} />
            <IconColorPicker type={ColorPickerType.BACKGROUND} />
            {iconColor !== "original" && (
              <IconContrastRatio
                iconColor={iconColor}
                iconBackgroundColor={backgroundColor}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state: Store) => {
  return {
    iconBackgroundColor: state.iconsStore.iconBackgroundColor,
    iconColor: state.iconsStore.iconColor,
    iconStyle: state.iconsStore.iconStyle,
    selectedIcon: state.iconsStore.selectedIcon
  };
};

export default Redux.connect(mapStateToProps)(IconInPanel);
