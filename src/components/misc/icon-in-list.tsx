import * as React from 'react';
import {IconBasic} from "../../redux/store-interfaces";
import IconUnknownExtension from "./icon-unknown-extension";
import './misc.less';

interface PropTypes {
    icon: IconBasic;
    selected: boolean;
}

class IconInList extends React.PureComponent<PropTypes> {
    public render() {
        const {icon, selected} = this.props;
        const className = `icon-in-list ${selected ? 'icon-in-list-selected' : ''}`;
        return (
            <div className={className} style={{backgroundImage: `url(${icon.link})`}}>
                <IconUnknownExtension extension={icon.extension}/>
            </div>
        );
    }
}

export default IconInList;