/* tslint:disable */
import * as React from 'react';
import {Icon as IIcon} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon,  iconClass: string, iconContainerClass: string, iconColor: string, iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void};

class Icon extends React.Component <PropTypes> {

    public render() {

        const {icon, iconClass, iconContainerClass, iconClickTrigger} = this.props;

        const style = {
            icon: {
                backgroundImage: `url(${icon.link})`,
            },
        }

        return (
            <div className={iconContainerClass}  onClick={iconClickTrigger}>
                <div className={iconClass} style={style.icon} />
            </div>
        );
    }
}

export default Icon;