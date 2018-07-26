import * as React from 'react';
import {IconBasic} from "../../redux/store-interfaces";
import IconUnknownExtension from "./icon-unknown-extension";
import './misc.less';

interface PropTypes {
    icon: IconBasic;
    selected: boolean;
}

function IconInList(props: PropTypes) {
    const {icon, selected} = props;
    const className = `icon-in-list ${selected ? 'icon-in-list-selected' : ''}`;
    const iconLink = `url(${icon.link})`;
    const style = {
        backgroundImage: icon.extension === "png" || icon.extension === "svg"
            ? iconLink
            : undefined
    };
    return (
        <div className={className} style={style}>
            <IconUnknownExtension extension={icon.extension}/>
        </div>
    );
}

export default IconInList;