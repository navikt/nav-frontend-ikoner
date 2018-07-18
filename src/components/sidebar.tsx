import * as React from "react";
import * as Redux from "react-redux";
import {IconExpanded, IconStyle, IconType, Store, Tags} from "../redux/store-interfaces";
import DownloadButton from "./buttons/download-button";
import {default as DownloadTypes} from "./misc/download-types";
import Icon from './misc/icon';
import './misc/misc.less';
import Seperator from "./misc/seperator";
import IconDescription from './sidebar/icon-description'
import IconTitle from './sidebar/icon-title'
import TagsHandler from './sidebar/tags-handler';

interface PropTypes { selectedIcon: IconExpanded, iconStyle: IconStyle};
interface StateTypes { tags: Tags; suggestions:Tags };

class Sidebar extends React.Component<PropTypes, StateTypes>{

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
                    <Icon imageLink={selectedIcon.bestLocation.url} extension={selectedIcon.bestLocation.extension} iconType={IconType.IN_PANEL} iconColor="black"/>
                    <IconDescription />
                    <TagsHandler />
                    <Seperator/>
                    <DownloadTypes icon={selectedIcon} iconStyle={this.props.iconStyle}/>
                    <DownloadButton icon={selectedIcon}/>
                </div>
            </div>
        );
    }
}


const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};


export default Redux.connect(mapStateToProps)(Sidebar);