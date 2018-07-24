import * as React from 'react';
import Language from '../../language/norwegian';
import {IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes {
    imageLink: string;
    extension: string;
    iconType: IconType;
    iconColor: string;
    iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

function getIconClass(iconType: IconType): string {
    return iconType === IconType.IN_LIST ? Language.ICON_IN_LIST : Language.ICON_IN_PANEL;
}

function Icon(props: PropTypes) {
    const {imageLink, extension, iconClickTrigger, iconType} = props;

    return (
        <div className={getIconClass(iconType)}
             onClick={iconClickTrigger}
             style={{backgroundImage: `url(${imageLink})`}}
        >
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

export default Icon;