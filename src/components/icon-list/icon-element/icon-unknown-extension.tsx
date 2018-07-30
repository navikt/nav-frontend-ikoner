import * as React from "react";
import "./icon-unknown-extension.less";

interface PropTypes {
  extension: string;
}

function IconUnknownExtension(props: PropTypes) {
  const { extension } = props;
  if (extension !== "svg" && extension !== "png") {
    return (
      <div className="unknown-extension-container">
        <div className="unknown-extension">{extension.toLocaleUpperCase()}</div>
      </div>
    );
  }
  return null;
}

export default IconUnknownExtension;
