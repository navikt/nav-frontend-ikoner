import * as Contrast from 'get-contrast';
import * as React from "react";
import * as ReactTooltip from 'react-tooltip';
import Language from '../../language/norwegian';
import './icon-contrast-ratio.less';

interface PropTypes {
    iconColor: string;
    iconBackgroundColor: string;
}

function IconContrastRatio({iconColor, iconBackgroundColor} : PropTypes) {

    function getStatusColor(score: string){
        switch(score){
            case "AAA": return "green";
            case "AA" : return "orange";
            case "A"  : return "red";
            case "F"  : return "red";
        }
        return "red";
    }

    return (
        <a className="icon-contrast-ratio-bar-container"
           data-tip=""
           data-for="contrastRatio">
            <div className="icon-contrast-ratio-bar"
                 style={{backgroundColor: getStatusColor(Contrast.score(iconColor, iconBackgroundColor))}} />
            <ReactTooltip id={"contrastRatio"} offset={{'top': -10}} place={"bottom"} type={"dark"} effect={"solid"}>
                <div className="icon-contrast-ratio-title">
                    {Language.WCAG}
                </div>
                <hr />
                <div className="icon-contrast-ratio-subtitle">
                    {Contrast.ratio(iconColor, iconBackgroundColor).toFixed(2)}
                    </div>
                <div className="icon-contrast-ratio-subtitle">{Contrast.score(iconColor, iconBackgroundColor)}</div>
            </ReactTooltip>
        </a>
    )
}
export default IconContrastRatio;