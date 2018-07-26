import * as React from "react";
import * as ReactTooltip from 'react-tooltip';
import Language from '../../language/norwegian';
import './icon-contrast-ratio.less';

var Line = require('rc-progress').Line; // tslint:disable-line
var contrast = require('get-contrast'); // tslint:disable-line

interface PropTypes {
    iconColor: string;
    iconBackgroundColor: string;
}

function IconContrastRatio({iconColor, iconBackgroundColor} : PropTypes) {

    function getCRStatusColor(score: string){
        switch(score){
            case "AAA":
                return "green";
                break;
            case "AA":
                return "orange";
                break;
            case "A":
                return "red";
                break;
            case "F":
                return "red";
                break;
        }
        return "red";
    }

    return (
        <div className="icon-contrast-ratio-bar">
            <a data-tip="" data-for={"contrastRatio"}>
                <Line key={1}
                      percent="100"
                      strokeWidth="15"
                      strokeColor={getCRStatusColor(contrast.score(iconColor, iconBackgroundColor))}
                />
            </a>
            <ReactTooltip id={"contrastRatio"} place={"bottom"} type={"dark"} effect={"solid"}>
                <div className="icon-contrast-ratio-title">
                    {Language.WCAG}
                </div>
                <hr />
                <div className="icon-contrast-ratio-subtitle">
                    {contrast.ratio(iconColor, iconBackgroundColor).toFixed(2)}
                    </div>
                <div className="icon-contrast-ratio-subtitle">{contrast.score(iconColor, iconBackgroundColor)}</div>
            </ReactTooltip>
        </div>
    )
}
export default IconContrastRatio;