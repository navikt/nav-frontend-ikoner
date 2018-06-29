/* tslint:disable */
import * as React from 'react';
import {Icon as IIcon, IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon, iconType: IconType, iconColor: string, iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void};

class Icon extends React.Component <PropTypes> {

    public render() {

        const {icon, iconClickTrigger, iconType} = this.props;

        const style = {
            icon: {
                backgroundImage: `url(${icon.link})`,
            },
        }

        let iconClass = 'icon';
        let iconContainerClass = 'icon-container';

        switch(iconType){
            case "inPanel":
                iconClass = 'selected-icon';
                iconContainerClass = 'selected-icon-container';
                break
        }

        return (
            <div className={iconContainerClass}  onClick={iconClickTrigger}>
                <div className={iconClass} style={style.icon} />
            </div>
        );
    }
}

export default Icon;