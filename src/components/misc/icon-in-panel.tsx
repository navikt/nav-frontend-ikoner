import * as React from 'react';
import {IconExpanded} from "../../redux/store-interfaces";
import IconUnknownExtension from "./icon-unknown-extension";
import './misc.less';

interface PropTypes {
    icon: IconExpanded
};

class IconInPanel extends React.Component <PropTypes> {

    constructor(props:PropTypes){
        super(props);
    }
    public render() {

        const {icon} = this.props;
        return (
            <div
                className="icon-in-panel"
                style={{backgroundImage: `url(${icon.bestLocation.url})`}} >
                <IconUnknownExtension extension={icon.bestLocation.extension}/>
            </div>
        );
    }
}

export default IconInPanel;