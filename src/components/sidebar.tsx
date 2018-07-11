/* tslint:disable */
import * as Redux from "react-redux";
import TagsHandler from './sidebar/tags-handler';
import {IconStyle, IconType, Store} from "../redux/store-interfaces";
import DownloadButton from "./buttons/download-button";
import Icon from './misc/icon';
import './misc/misc.less';
import IconTitle from './sidebar/icon-title'
import IconDescription from './sidebar/icon-description'
import Seperator from "./misc/seperator";
import * as React from "react";

interface PropTypes { selectedIcon: any, iconStyle: IconStyle};
interface StateTypes { tags: any; suggestions:any };

class Sidebar extends React.Component<PropTypes, StateTypes>{

    public render() {

        const {selectedIcon} = this.props;
        if(!selectedIcon){
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