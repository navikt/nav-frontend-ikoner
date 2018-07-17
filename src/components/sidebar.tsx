import * as React from "react";
import * as Redux from "react-redux";
import {IconExpanded, IconStyle, IconType, Store, Tags} from "../redux/store-interfaces";
import ApiLinkCreator from "./../utils/api-link-creator";
import DownloadButton from "./buttons/download-button";
import Icon from './misc/icon';
import './misc/misc.less';
import Seperator from "./misc/seperator";
import './sidebar.less';
import IconColorPicker from "./sidebar/icon-color-picker";
import IconDescription from './sidebar/icon-description'
import IconTitle from './sidebar/icon-title'
import TagsHandler from './sidebar/tags-handler';

interface PropTypes { selectedIcon: IconExpanded, iconStyle: IconStyle, iconColor: string};
interface StateTypes { tags: Tags; suggestions:Tags };

class Sidebar extends React.Component<PropTypes, StateTypes>{

    public render() {

        const {selectedIcon, iconStyle, iconColor} = this.props;
        if(!selectedIcon){
            return (
                <div className="icon-side-panel" />
            );
        }

        return (
            <div className="icon-side-panel">
                <div className="icon-side-panel-content">
                    <IconTitle />
                    <Icon
                        imageLink={ApiLinkCreator.iconDisplayLink(iconStyle, iconColor, selectedIcon)}
                        extension={selectedIcon.bestLocation.extension}
                        iconType={IconType.IN_PANEL}
                        iconColor="black"/>
                    <IconColorPicker />
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
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};


export default Redux.connect(mapStateToProps)(Sidebar);