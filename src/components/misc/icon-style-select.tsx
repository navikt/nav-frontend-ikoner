import * as React from 'react';
import * as Redux from 'react-redux';
import {ToggleGruppe, ToggleKnapp} from '../../../node_modules/nav-frontend-skjema';
import Language from '../../language/norwegian';
import {resetIconFetch, setIconStyle} from "../../redux/actions";
import {IconStyle, Store} from '../../redux/store-interfaces';
import api from "../../utils/api";
import './misc.less';

interface PropTypes {iconStyle : IconStyle, selectedIcon: any, setIconStyle: typeof setIconStyle, fetchIcon: any};

class IconStyleSelect extends React.Component <PropTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    public onToggle(){
        const newStyle = this.props.iconStyle === IconStyle.FILLED ? IconStyle.LINE : IconStyle.FILLED;
        this.props.setIconStyle(newStyle);
        if(this.props.selectedIcon){
            this.props.fetchIcon(this.props.selectedIcon.id, newStyle);
        }
    }

    public render() {
        return (
            <ToggleGruppe onChange={this.onToggle} name='toggleGruppe'>
                <ToggleKnapp key={1} defaultChecked={true} value='Filled'>
                    {Language.FILLED_ICON}
                </ToggleKnapp>
                <ToggleKnapp  key={2} defaultChecked={false} value='Line' >
                    {Language.LINE_ICON}
                </ToggleKnapp>
            </ToggleGruppe>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    fetchIcon : (filename:string, style: IconStyle)  => api.fetchIcon(filename, style)(dispatch),
    setIconStyle : (iconStyle: IconStyle)  => {dispatch(setIconStyle(iconStyle)); dispatch(resetIconFetch()); },
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconStyleSelect);