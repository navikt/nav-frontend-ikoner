/* tslint:disable */
import * as React from 'react';
import * as Redux from 'react-redux';
import {resetIconFetch, setIconStyle} from "../../redux/actions";
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
        this.props.setIconStyle(this.props.iconStyle === IconStyle.FILLED ? IconStyle.LINE : IconStyle.FILLED);
    }

    public render() {
        return (
            <ToggleGruppe onChange={this.onToggle}
                          name='toggleGruppe'>
                <ToggleKnapp value='Filled' defaultChecked={true} key='1'>
                    Filled
                </ToggleKnapp>
                <ToggleKnapp value='Line' defaultChecked={false} key='2'>
                    Line
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
    setIconStyle : (iconStyle: IconStyle)  => {dispatch(setIconStyle(iconStyle)); dispatch(resetIconFetch()); },
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconStyleSelect);