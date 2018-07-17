import * as React from "react";
import { ColorResult, TwitterPicker } from 'react-color';
import * as Redux from "react-redux";
import {IconColorAction, setIconColor} from "../../redux/actions";
import {Store} from "../../redux/store-interfaces";
import '../misc/misc.less';
import './tags.less';

interface PropTypes {
    setIconColor:  (color: string) => Promise<IconColorAction>,
    iconColor: string,
};

class IconColorPicker extends React.Component<PropTypes>{

    constructor(props: PropTypes) {
        super(props);
        this.handleChangeComplete = this.handleChangeComplete.bind(this);
    }

    public render() {

        return (
            <div className="icon-color-picker-container">
                <TwitterPicker onChange={ this.handleChangeComplete } />
            </div>
        );
    }

    private handleChangeComplete (color : ColorResult) {
        this.props.setIconColor(color.hex);
    };
}

const mapStateToProps = (state: Store) => {
    return {
        iconColor: state.iconsStore.iconColor,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setIconColor : ( color : string )  => dispatch(setIconColor(color))
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconColorPicker);