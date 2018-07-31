import * as Contrast from "get-contrast";
import * as React from "react";
import * as ReactTooltip from "react-tooltip";
import Language from "../../../language/norwegian";
import "./icon-contrast-ratio.less";

interface PropTypes {
  iconColor: string;
  iconBackgroundColor: string;
}

function IconContrastRatio({ iconColor, iconBackgroundColor }: PropTypes) {
  function getStatusColor() {
    const score = Contrast.score(iconColor, iconBackgroundColor);
    switch (score) {
      case "AAA":
        return "green";
      case "AA":
        return "orange";
      case "A":
        return "red";
      case "F":
        return "red";
    }
    return "red";
  }

  function getTooltip() {
    const ratio = Contrast.ratio(iconColor, iconBackgroundColor).toFixed(2);
    const score = Contrast.score(iconColor, iconBackgroundColor);
    return (
      <ReactTooltip
        id={"contrastRatio"}
        offset={{ top: -10 }}
        place={"bottom"}
        type={"dark"}
        effect={"solid"}
      >
        <div className="icon-contrast-ratio-title">{Language.WCAG}</div> <hr />
        <div className="icon-contrast-ratio-subtitle">{ratio}</div>
        <div className="icon-contrast-ratio-subtitle">{score}</div>
      </ReactTooltip>
    );
  }

  return (
    <a
      data-tip=""
      className="icon-contrast-ratio-bar-container"
      data-for="contrastRatio"
    >
      <div
        className="icon-contrast-ratio-bar"
        style={{ backgroundColor: getStatusColor() }}
      />
      {getTooltip()}
    </a>
  );
}
export default IconContrastRatio;
