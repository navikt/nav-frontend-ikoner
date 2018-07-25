import * as React from 'react';
import * as Redux from 'react-redux';
import {AnyAction} from 'redux';
import {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {ToggleGruppe, ToggleKnapp} from '../../../node_modules/nav-frontend-skjema';
import Language from '../../language/norwegian';
import {fetchIcon, setIconStyle} from "../../redux/actions";
import {IconColorStyle, SelectedIconAction} from "../../redux/actions-interfaces";
import {IconExpanded, IconStyle, Store} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes {
    iconStyle : IconStyle;
    selectedIcon: IconExpanded;
    setIconStyle: (iconStyle: IconStyle) => IconColorStyle;
    fetchIcon: (filename:string) => ThunkAction<void, Store, {}, SelectedIconAction>;
};

class IconStyleSelect extends React.Component <PropTypes> {

    constructor(props: PropTypes){
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    public onToggle(){
        const newStyle = this.props.iconStyle === IconStyle.FILLED ? IconStyle.LINE : IconStyle.FILLED;
        this.props.setIconStyle(newStyle);
        if(this.props.selectedIcon){
            this.props.fetchIcon(this.props.selectedIcon.id);
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

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, {}, AnyAction>) => ({
    fetchIcon : (filename:string)  => dispatch(fetchIcon(filename)),
    setIconStyle : (iconStyle: IconStyle)  => dispatch(setIconStyle(iconStyle)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconStyleSelect);