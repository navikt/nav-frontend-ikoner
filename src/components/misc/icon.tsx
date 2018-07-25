import * as React from 'react';
import {ColorPickerType, IconType} from '../../redux/store-interfaces';
import IconColorPicker from "../sidebar/icon-color-picker";
import '../sidebar/icon-color-picker.less';
import './misc.less';

interface PropTypes {
    backgroundColor?: string,
    colorPickers?: boolean,
    imageLink:string,
    extension: string,
    iconType: IconType,
    iconColor: string,
    iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void
};
interface StateTypes {
    fetchingIcon : boolean,
    backgroundImage: HTMLImageElement
}

class Icon extends React.Component <PropTypes, StateTypes> {

    public render() {

        const {imageLink, extension, iconClickTrigger, iconType, backgroundColor} = this.props;

        return (
            <div
                className={this.getIconClass(iconType)}
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
                <div className="icon-color-picker-container">
                    {this.props.colorPickers && <div className="icon-color-picker-box" />}
                    {this.props.colorPickers && <IconColorPicker type={ColorPickerType.FOREGROUND} /> }
                    {this.props.colorPickers && <IconColorPicker type={ColorPickerType.BACKGROUND} /> }
                </div>
            </div>
        );
    }

    private getIconClass (iconType : IconType ) : string{
        return iconType === IconType.IN_LIST ? 'icon-in-list' : 'icon-in-panel';
    }
}

export default Icon;