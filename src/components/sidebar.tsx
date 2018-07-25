import * as React from "react";
import * as Redux from "react-redux";
import {IconExpanded, IconStyle, IconType, Store, Tags} from "../redux/store-interfaces";
import ApiLinkCreator from "./../utils/api-link-creator";
import DownloadButton from "./buttons/download-button";
import Icon from './misc/icon';
import './misc/misc.less';
import Seperator from "./misc/seperator";
import IconDescription from './sidebar/icon-description'
import IconDownloadTypes from "./sidebar/icon-download-types";
import IconTitle from './sidebar/icon-title'
import TagsHandler from './sidebar/tags-handler';

interface PropTypes {
    iconBackgroundColor: string;
    selectedIcon: IconExpanded;
    iconStyle: IconStyle;
    iconColor: string;
}

interface StateTypes {
    tags: Tags;
    suggestions: Tags;
}

function Sidebar(props: PropTypes, state: StateTypes) {
    const {selectedIcon, iconStyle, iconColor, iconBackgroundColor} = props;

    if (!selectedIcon || !selectedIcon.bestLocation) {
        return (<div className="icon-side-panel"/>)
    }

    return (
        <div className="icon-side-panel">
            <div className="icon-side-panel-content">
                <IconTitle/>
                <Icon
                    imageLink={ApiLinkCreator.iconDisplay(iconStyle, iconColor, selectedIcon)}
                    extension={selectedIcon.bestLocation.extension}
                    iconType={IconType.IN_PANEL}
                    backgroundColor={iconBackgroundColor}
                    colorPickers={true}
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
        iconBackgroundColor: state.iconsStore.iconBackgroundColor,
        iconColor: state.iconsStore.iconColor,
        iconStyle: state.iconsStore.iconStyle,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

export default Redux.connect(mapStateToProps)(Sidebar);