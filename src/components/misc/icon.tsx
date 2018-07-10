import * as React from 'react';
import {Icon as IIcon, IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon, iconType: IconType, iconColor: string, iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void};
interface StateTypes { fetchingIcon : boolean, backgroundImage: HTMLImageElement}

class Icon extends React.Component <PropTypes, StateTypes> {

    public render() {

        const {icon, iconClickTrigger, iconType} = this.props;

        return (
            <div className={this.getIconClass(iconType)}  onClick={iconClickTrigger} style={{backgroundImage: `url(${icon.link})`}} >
                {icon.extension !== "svg" && icon.extension !== "png" &&
                    <div className="pdf-replacement-container">
                        <div className="pdf-replacement">
                            {icon.extension.toLocaleUpperCase()}
                        </div>
                    </div>
                }
            </div>
        );
    }

    private getIconClass (iconType : IconType ) : string{
        return iconType === IconType.IN_LIST ? 'icon-in-list' : 'icon-in-panel';
    }
}

export default Icon;