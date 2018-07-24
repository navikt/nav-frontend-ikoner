import * as React from 'react';
import * as Redux from 'react-redux';
import {ToggleGruppe, ToggleKnapp} from '../../../node_modules/nav-frontend-skjema';
import Language from '../../language/norwegian';
import {IconColorStyle, SelectedIconAction, setIconStyle} from "../../redux/actions";
import {IconExpanded, IconStyle, Store} from '../../redux/store-interfaces';
import api from "../../utils/api";
import './misc.less';

interface PropTypes {
    iconStyle: IconStyle;
    selectedIcon: IconExpanded;
    setIconStyle: (iconStyle: IconStyle) => IconColorStyle;
    fetchIcon: (filename: string, style: IconStyle) => Promise<SelectedIconAction>;
}

class IconStyleSelect extends React.Component <PropTypes> {

    constructor(props: PropTypes) {
        super(props);
        this.onToggle = this.onToggle.bind(this);
    }

    public onToggle() {
        const newStyle = this.props.iconStyle === IconStyle.FILLED ? IconStyle.LINE : IconStyle.FILLED;
        this.props.setIconStyle(newStyle);
        if (this.props.selectedIcon) {
            this.props.fetchIcon(this.props.selectedIcon.id, newStyle);
        }
    }

    public render() {
        return (
            <ToggleGruppe onChange={this.onToggle} name='toggleGruppe'>
                <ToggleKnapp key={1} defaultChecked={true} value={Language.FILLED_ICON}>
                    {Language.FILLED_ICON}
                </ToggleKnapp>
                <ToggleKnapp key={2} defaultChecked={false} value={Language.LINE_ICON}>
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

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcon: (filename: string, style: IconStyle) => api.fetchIcon(filename, style)(dispatch),
    setIconStyle: (iconStyle: IconStyle) => dispatch(setIconStyle(iconStyle)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconStyleSelect);