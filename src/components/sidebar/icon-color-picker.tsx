import * as React from "react";
import { ColorResult, TwitterPicker } from 'react-color';
import * as Redux from "react-redux";
import Language from "../../language/norwegian";
import {IconColorAction, IconColorBackgroundAction, setIconBackgroundColor, setIconColor} from "../../redux/actions";
import {ColorPickerType, Store} from "../../redux/store-interfaces";
import {colors} from "../../utils/colors";
import '../misc/misc.less';
import './tags.less';

interface PropTypes {
    setIconColor:  (color: string) => IconColorAction,
    setIconBackgroundColor:  (color: string) => IconColorBackgroundAction,
    iconColor: string,
    iconBackgroundColor: string,
    type?: ColorPickerType,
};

interface StateTypes{
    displayColorPicker: boolean,
    colorTitle: string,
    colorDescription: string,
}

class IconColorPicker extends React.Component<PropTypes, StateTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
        this.handleHover = this.handleHover.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            colorDescription: "",
            colorTitle: "",
            displayColorPicker: false,
        }
    }

    public render() {

        let buttonStyle = "icon-color-picker-foreground";
        if(this.props.type === ColorPickerType.BACKGROUND) {
            buttonStyle = "icon-color-picker-background";
        }

        return <>
            <div className={buttonStyle}
                 onClick={this.handleClick}
                 style={{backgroundColor: this.props.type === ColorPickerType.FOREGROUND ? this.props.iconColor : this.props.iconBackgroundColor}}
            />
            {this.state.displayColorPicker ?
                <div className="icon-color-picker-popover">
                    <div className="icon-color-picker-cover" onClick={this.handleClose}/>
                    <TwitterPicker onSwatchHover={this.handleHover} triangle="top-right" colors={colors.basic}
                                   onChange={this.handleChangeComplete}/>
                    {(this.state.colorDescription && this.state.colorTitle) &&
                        <div className="icon-color-picker-popover-footer">
                            {this.state.colorTitle}
                            <hr/>
                            <p>{this.state.colorDescription ? this.state.colorDescription : Language.NO_DESCRIPTION}</p>
                        </div>
                    }
                </div>
                : null
            }
        </>;
    }

    private handleChangeComplete (color : ColorResult) {
        if(this.props.type === ColorPickerType.FOREGROUND) {
            this.props.setIconColor(color.hex);
        }
        if(this.props.type === ColorPickerType.BACKGROUND) {
            this.props.setIconBackgroundColor(color.hex);
        }
    };

    private handleHover = (color: any, event: MouseEvent) => {

        const detailedColor = colors.detailed
            .filter(c => c.color === color.hex)[0];

        this.setState({
            colorDescription: detailedColor.description,
            colorTitle:  detailedColor.title,
        });
    };

    private handleClick = () => {
        this.setState({
            displayColorPicker: !this.state.displayColorPicker
        })
    };

    private handleClose = () => {
        this.setState({
            colorDescription: "",
            colorTitle:  "",
            displayColorPicker: false ,
        })
    };
}

const mapStateToProps = (state: Store) => {
    return {
        iconBackgroundColor: state.iconsStore.iconBackgroundColor,
        iconColor: state.iconsStore.iconColor,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setIconBackgroundColor : ( color : string )  => dispatch(setIconBackgroundColor(color)),
    setIconColor : ( color : string )  => dispatch(setIconColor(color))
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconColorPicker);