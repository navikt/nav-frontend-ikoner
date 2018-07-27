import * as React from 'react';
import * as Redux from 'react-redux';
import {ColorPickerType, IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import {iconDisplay} from "../../utils/api-link-creator";
import IconColorPicker from '../sidebar/icon-color-picker'
import IconUnknownExtension from "./icon-unknown-extension";
import './misc.less';

interface PropTypes {
    icon: IconExpanded;
    iconStyle: IconStyle;
    iconBackgroundColor: string;
    iconColor: string;
}

function IconInPanel(props: PropTypes) {
    const {icon, iconBackgroundColor, iconColor, iconStyle} = props;
    const iconLink = `url(${iconDisplay(iconStyle, iconColor, icon)})`;
    const extension = icon.bestLocation.extension;
    const style = {
        backgroundColor: iconBackgroundColor,
        backgroundImage: extension === "svg" || extension === "png"
            ? iconLink
            : undefined
    };

    return (
        <div
            className="icon-in-panel"
            style={style}>
            <IconUnknownExtension extension={icon.bestLocation.extension}/>
            <div className="icon-color-picker-container">
                <div className="icon-color-picker-box"/>
                <IconColorPicker type={ColorPickerType.FOREGROUND}/>
                <IconColorPicker type={ColorPickerType.BACKGROUND}/>
            </div>
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

export default Redux.connect(mapStateToProps)(IconInPanel)
