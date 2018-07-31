import * as React from "react";
import * as Redux from "react-redux";
import { IconExpanded, Store } from "../../redux/store-interfaces";
import IconInPanel from "../icon-list/icon-element/icon-in-panel";
import IconDownloadButton from "./icon-download/icon-download-button";
import IconDownloadTypes from "./icon-download/icon-download-types";
import IconDescription from "./icon-information/icon-description";
import IconTagsHandler from "./icon-information/icon-tags-handler";
import IconTitle from "./icon-information/icon-title";
import Seperator from "./seperator";
import "./side-panel.less";
import SvgUrlClipboard from "./svg-url-clipboard";

interface PropTypes {
  selectedIcon: IconExpanded;
}

function SidePanel(props: PropTypes) {
  const { selectedIcon } = props;

  if (!selectedIcon || !selectedIcon.bestLocation) {
    return <div className="icon-side-panel" />;
  }

  return (
    <div className="icon-side-panel">
      <div className="icon-side-panel-content">
        <IconTitle />
        <IconInPanel />
        <IconDescription />
        <IconTagsHandler />
        <Seperator />
        <IconDownloadTypes />
        <IconDownloadButton />
        <SvgUrlClipboard />
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => {
  return {
    selectedIcon: state.iconsStore.selectedIcon
  };
};

export default Redux.connect(mapStateToProps)(SidePanel);
