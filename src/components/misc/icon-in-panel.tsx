import * as React from 'react';
import * as Redux from 'react-redux';
import {ColorPickerType, IconExpanded, IconStyle, Store} from "../../redux/store-interfaces";
import LinkCreator from "../../utils/api-link-creator";
import IconColorPicker from '../sidebar/icon-color-picker'
import IconContrastRatio from '../sidebar/icon-contrast-ratio';
import IconUnknownExtension from "./icon-unknown-extension";
import './misc.less';

interface PropTypes {
    icon: IconExpanded,
    iconStyle: IconStyle,
    iconBackgroundColor: string,
    iconColor: string,
};

class IconInPanel extends React.Component <PropTypes> {

    constructor(props:PropTypes){
        super(props);
    }
    public render() {
        const {icon, iconBackgroundColor, iconColor, iconStyle} = this.props;
        return (
            <div
                className="icon-in-panel"
                style={{
                    backgroundColor: iconBackgroundColor,
                    backgroundImage: `url(${LinkCreator.iconDisplay(iconStyle, iconColor, icon)})`}} >
                <IconUnknownExtension extension={icon.bestLocation.extension}/>
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
