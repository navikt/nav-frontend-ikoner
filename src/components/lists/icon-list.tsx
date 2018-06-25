import * as React from 'react';
import Icon from "../Misc/icon";
import './lists.less';

class IconList extends React.Component {

    public render() {
        return (
            <div className="icon-list">
                <Icon/>
                <Icon/>
                <Icon/>
                <Icon/>
                <Icon/>
                <Icon/>
                <Icon/>
                <Icon/>
                <Icon/>
            </div>
        );
    }
}

export default IconList;