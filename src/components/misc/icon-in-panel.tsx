import * as React from 'react';
import * as Redux from 'react-redux';
import {ColorPickerType, IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import {iconDisplay} from "../../utils/api-link-creator";
import IconColorPicker from '../sidebar/icon-color-picker'
import IconContrastRatio from "../sidebar/icon-contrast-ratio";
import IconUnknownExtension from "./icon-unknown-extension";
import './misc.less';

interface PropTypes {
    iconStyle: IconStyle;
    iconBackgroundColor: string;
    iconColor: string;
    selectedIcon: IconExpanded;
};

class IconInPanel extends React.Component <PropTypes> {

    constructor(props: PropTypes) {
        super(props);
    }

    public render() {
        const {selectedIcon, iconBackgroundColor, iconColor, iconStyle} = this.props;
        return (
            <div
                className="icon-in-panel"
                style={{
                    backgroundColor: iconBackgroundColor,
                    backgroundImage: `url(${iconDisplay(iconStyle, iconColor, selectedIcon)})`
                }} >
                <IconUnknownExtension extension={selectedIcon.bestLocation.extension}/>
                <div className="icon-color-picker-container">
                    <div className="icon-color-picker-box" />
                    <IconColorPicker type={ColorPickerType.FOREGROUND} />
                    <IconColorPicker type={ColorPickerType.BACKGROUND} />
                    <IconContrastRatio iconColor={iconColor} iconBackgroundColor={iconBackgroundColor}/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconBackgroundColor: state.iconsStore.iconBackgroundColor,
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

export default Redux.connect(mapStateToProps)(IconInPanel)
