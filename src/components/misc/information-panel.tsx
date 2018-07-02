import * as React from 'react';
import * as Redux from "react-redux";
import {Icon as IIcon, IconType, Store} from "../../redux/store-interfaces";
import DownloadButton from "../buttons/download-button";
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
                <DownloadButton icon={selectedIcon}/>
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