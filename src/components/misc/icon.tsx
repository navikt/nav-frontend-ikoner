/* tslint:disable */
import * as React from 'react';
import {Icon as IIcon, IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon, iconType: IconType, iconColor: string, iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void};

class Icon extends React.Component <PropTypes> {

    public getIconClass (iconType : IconType ) : string{
        return iconType === IconType.IN_LIST ? 'icon-in-list' : 'icon-in-panel';
    }

    public render() {

        const {icon, iconClickTrigger, iconType} = this.props;

        const style = {
            icon: {
                backgroundImage: `url(${icon.link})`,
            },
        }

        return (
            <div className={this.getIconClass(iconType)}  onClick={iconClickTrigger} style={style.icon}>
                {icon.extension != "svg" && icon.extension != "png" &&
                <div className="pdf-replacement-container">
                    <div className="pdf-replacement">
                        {icon.extension}
                    </div>
                </div>
                    }
            </div>
        );
    }
}

export default Icon;