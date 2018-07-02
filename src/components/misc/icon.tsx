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

        let iconClass, iconContainerClass;
        switch(iconType){
            case IconType.IN_LIST:
                iconClass = 'icon';
                iconContainerClass = 'icon-container';
                break;
            case IconType.IN_PANEL:
                iconClass = 'selected-icon';
                iconContainerClass = 'selected-icon-container';
                break;
        }

        return (
            <div className={iconContainerClass}  onClick={iconClickTrigger}>
                <div className={iconClass} style={style.icon} />
            </div>
        );
    }
}

export default Icon;