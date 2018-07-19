import * as React from 'react';
import {IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes {
    imageLink:string,
    extension: string,
    iconType: IconType,
    iconColor: string,
    selected?: boolean,
    iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void
};
interface StateTypes { fetchingIcon : boolean, backgroundImage: HTMLImageElement}

class Icon extends React.Component <PropTypes, StateTypes> {

    constructor(props:PropTypes){
        super(props);
    }
    public render() {

        const {imageLink, extension, iconClickTrigger, iconType, selected} = this.props;
        return (
            <div
                className={iconType === IconType.IN_LIST ?
                    `icon-in-list ${selected ? 'icon-in-list-selected' : undefined}`  :
                    'icon-in-panel'
                }
                onClick={iconClickTrigger}
                style={{backgroundImage: `url(${imageLink})`}} >
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
}

export default Icon;