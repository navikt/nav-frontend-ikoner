import * as React from "react";
import * as Redux from "react-redux";
import {IconExpanded, IconStyle, IconType, Store, Tags} from "../redux/store-interfaces";
import DownloadButton from "./buttons/download-button";
import Icon from './misc/icon';
import './misc/misc.less';
import Seperator from "./misc/seperator";
import IconDescription from './sidebar/icon-description'
import IconDownloadTypes from "./sidebar/icon-download-types";
import IconTitle from './sidebar/icon-title'
import TagsHandler from './sidebar/tags-handler';

interface PropTypes {
    selectedIcon: IconExpanded,
    iconStyle: IconStyle
};

interface StateTypes {
    tags: Tags;
    suggestions: Tags
};

function Sidebar(props: PropTypes, state: StateTypes) {
    const {selectedIcon} = props;
    if (!selectedIcon || !selectedIcon.bestLocation) {
        return (
            <div className="icon-side-panel"/>
        );
    }

    return (
        <div className="icon-side-panel">
            <div className="icon-side-panel-content">
                <IconTitle/>
                <Icon imageLink={selectedIcon.bestLocation.url}
                      extension={selectedIcon.bestLocation.extension}
                      iconType={IconType.IN_PANEL}
                      iconColor="black"/>
                <IconDescription/>
                <TagsHandler/>
                <Seperator/>
                <IconDownloadTypes/>
                <DownloadButton/>
            </div>
        </div>
    );
}

const mapStateToProps = (state: Store) => {
    return {
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

export default Redux.connect(mapStateToProps)(Sidebar);