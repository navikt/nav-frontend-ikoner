import * as React from 'react';
import {IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { imageLink:string, extension: string, iconType: IconType, iconColor: string, iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void};
interface StateTypes { fetchingIcon : boolean, backgroundImage: HTMLImageElement}

class Icon extends React.Component <PropTypes, StateTypes> {

    public render() {

        const {imageLink, extension, iconClickTrigger, iconType} = this.props;

        return (
            <div className={this.getIconClass(iconType)}  onClick={iconClickTrigger} style={{backgroundImage: `url(${imageLink})`}} >
                {extension !== "svg" && extension !== "png" &&
                    <div className="pdf-replacement-container">
                        <div className="pdf-replacement">
                            {extension.toLocaleUpperCase()}
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