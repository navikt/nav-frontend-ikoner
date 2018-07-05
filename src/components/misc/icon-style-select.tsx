/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import {setIconStyle} from "../../redux/actions";
import {IconStyle, Store} from '../../redux/store-interfaces';
import './misc.less';
import {ToggleGruppe, ToggleKnapp} from '../../../node_modules/nav-frontend-skjema';

interface PropTypes {iconStyle : IconStyle, setIconStyle: typeof setIconStyle};

class IconStyleSelect extends React.Component <PropTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    public onToggle(){
        console.log(this.props.iconStyle);
        this.props.setIconStyle(this.props.iconStyle === IconStyle.FILLED ? IconStyle.LINE : IconStyle.FILLED);
    }

    public render() {
        return (
            <ToggleGruppe onChange={this.onToggle}
                          name='toggleGruppe'>
                <ToggleKnapp value='knapp1' defaultChecked={true} key='1'>
                    <div />
                </ToggleKnapp>
                <ToggleKnapp value='knapp2' defaultChecked={false} key='2'>
                    <div />
                </ToggleKnapp>
            </ToggleGruppe>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setIconStyle : (iconStyle: IconStyle)  => dispatch(setIconStyle(iconStyle)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconStyleSelect);