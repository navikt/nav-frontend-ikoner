import * as React from "react";
import * as Redux from "react-redux";
import {IconExpanded, IconStyle, Store, Tags} from "../redux/store-interfaces";
import DownloadButton from "./buttons/download-button";
import IconInPanel from './misc/icon-in-panel';
import './misc/misc.less';
import Seperator from "./misc/seperator";
import IconDescription from './sidebar/icon-description'
import IconTitle from './sidebar/icon-title'
import TagsHandler from './sidebar/tags-handler';

interface PropTypes { iconBackgroundColor: string, selectedIcon: IconExpanded, iconStyle: IconStyle, iconColor: string};
interface StateTypes { tags: Tags; suggestions:Tags };

class Sidebar extends React.PureComponent<PropTypes, StateTypes>{

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon || !selectedIcon.bestLocation){
            return (
                <div className="icon-side-panel" />
            );
        }

        return (
            <div className="icon-side-panel">
                <div className="icon-side-panel-content">
                    <IconTitle />
                    <IconInPanel icon={selectedIcon}/>
                    <IconDescription />
                    <TagsHandler />
                    <Seperator/>
                    <DownloadButton icon={selectedIcon}/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: Store) => {
    return {
        iconBackgroundColor: state.iconsStore.iconBackgroundColor,
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};


export default Redux.connect(mapStateToProps)(Sidebar);