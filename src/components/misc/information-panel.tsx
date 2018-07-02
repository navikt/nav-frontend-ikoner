import * as React from 'react';
import * as Redux from "react-redux";
import {config} from '../../appconfig';
import {Icon as IIcon, IconType, Store} from "../../redux/store-interfaces";
import Icon from './icon';
import './misc.less';

interface PropTypes { selectedIcon: IIcon };

class InformationPanel extends React.Component<PropTypes>{

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel">
                    <h2>Ikke selektert</h2>
                </div>
            );
        }
        return (
            <div className="icon-side-panel">
                <h2>{selectedIcon.title}</h2>
                <Icon icon={selectedIcon} iconType={IconType.IN_PANEL} iconColor="black"/>
                <a download={true} href={`${config.NAV_ICONS_API_LINK}/icon/download?title=${selectedIcon.title}`} className="selected-icon-download-link">
                    <button type="submit" className="knapp knapp--hoved selected-icon-download-button">Last ned ikon</button>
                </a>
            </div>

        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

export default Redux.connect(mapStateToProps)(InformationPanel);