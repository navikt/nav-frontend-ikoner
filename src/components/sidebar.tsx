import * as React from "react";
import * as Redux from "react-redux";
import { IconExpanded, Store } from "../redux/store-interfaces";
import DownloadButton from "./buttons/download-button";
import IconInPanel from "./misc/icon-in-panel";
import "./misc/misc.less";
import Seperator from "./misc/seperator";
import CDNClipboard from "./sidebar/cdn-modal";
import IconDescription from "./sidebar/icon-description";
import IconDownloadTypes from "./sidebar/icon-download-types";
import IconTitle from "./sidebar/icon-title";
import TagsHandler from "./sidebar/tags-handler";

interface PropTypes {
  selectedIcon: IconExpanded;
}

function Sidebar(props: PropTypes) {
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
        <TagsHandler />
        <Seperator />
        <IconDownloadTypes />
        <DownloadButton />
        <CDNClipboard />
      </div>
    </div>
  );
}

const mapStateToProps = (state: Store) => {
  return {
    selectedIcon: state.iconsStore.selectedIcon
  };
};

export default Redux.connect(mapStateToProps)(Sidebar);
