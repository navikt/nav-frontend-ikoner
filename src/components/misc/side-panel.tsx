import * as React from 'react';
import * as Redux from "react-redux";
import {Icon as IIcon, Store} from "../../redux/store-interfaces";
import Icon from './icon';
import './misc.less';

interface PropTypes { selectedIcon: IIcon };

class SidePanel extends React.Component<PropTypes>{

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
                <Icon icon={selectedIcon} iconClickTrigger={undefined} iconClass="selected-icon" iconContainerClass="selected-icon-container" iconColor="black"/>
                <a download={true} href={"/nav-frontend-ikoner-backend/api/icon/download?title=" + selectedIcon.title} className="selected-icon-download-link">
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

export default Redux.connect(mapStateToProps)(SidePanel);