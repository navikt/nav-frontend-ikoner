import * as React from 'react';
import {ColorPickerType, IconType} from '../../redux/store-interfaces';
import IconColorPicker from "../sidebar/icon-color-picker";
import '../sidebar/icon-color-picker.less';
import './misc.less';

interface PropTypes {
    backgroundColor?: string,
    colorPickers?: boolean,
    imageLink: string,
    extension: string,
    iconType: IconType,
    iconColor: string,
    iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void
};

function getIconClass(iconType: IconType): string {
    return iconType === IconType.IN_LIST
        ? 'icon-in-list'
        : 'icon-in-panel';
}

function Icon(props: PropTypes) {
    const {imageLink, extension, iconClickTrigger, iconType, backgroundColor, colorPickers} = props;
    return (
        <div
            className={getIconClass(iconType)}
            onClick={iconClickTrigger}
            style={{
                backgroundColor: backgroundColor ? backgroundColor : undefined,
                backgroundImage: `url(${imageLink})`
            }}>
            {extension !== "svg" && extension !== "png" &&
            <div className="pdf-replacement-container">
                <div className="pdf-replacement">
                    {extension.toLocaleUpperCase()}
                </div>
            </div>
            }
            {colorPickers &&
            <div className="icon-color-picker-container">
                <div className="icon-color-picker-box"/>
                <IconColorPicker type={ColorPickerType.FOREGROUND}/>
                <IconColorPicker type={ColorPickerType.BACKGROUND}/>
            </div>
            }
        </div>
    );
}

export default Icon;