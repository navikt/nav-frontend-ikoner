import * as React from "react";
import SearchBar from "../search-bar";
import "./icon-list-header.less";
import IconStyleSelect from "./icon-select-style";

function IconListHeader() {
  return (
    <div className="icon-list-header">
      <SearchBar />
      <IconStyleSelect />
    </div>
  );
}

export default IconListHeader;
