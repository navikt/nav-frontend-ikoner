import * as React from 'react';
import * as Redux from 'react-redux';
import {ToggleGruppe, ToggleKnapp} from '../../../node_modules/nav-frontend-skjema';
import Language from '../../language/norwegian';
import {resetIconFetch, setIconStyle} from "../../redux/actions";
import {IconStyle, Store} from '../../redux/store-interfaces';
import './misc.less';

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
    };
};

const mapDispatchToProps = (dispatch:Redux.Dispatch) => ({
    setIconStyle : (iconStyle: IconStyle)  => {dispatch(setIconStyle(iconStyle)); dispatch(resetIconFetch()); },
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconStyleSelect);