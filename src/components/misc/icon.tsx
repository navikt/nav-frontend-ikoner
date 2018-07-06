import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from 'react';
import {Icon as IIcon, IconType} from '../../redux/store-interfaces';
import './misc.less';

interface PropTypes { icon:IIcon, iconType: IconType, iconColor: string, iconClickTrigger?: (event: React.MouseEvent<HTMLDivElement>) => void};
interface StateTypes { fetchingIcon : boolean, backgroundImage: HTMLImageElement}

class Icon extends React.Component <PropTypes, StateTypes> {

    public constructor(props:PropTypes) {
        super(props);
        this.state={
            backgroundImage: new Image(),
            fetchingIcon: false,
        }
        this.iconFetchImage = this.iconFetchImage.bind(this);
        this.iconDidLoad = this.iconDidLoad.bind(this);

    }

    public componentDidMount(){
        this.iconFetchImage();
    }

    public render() {

        const {icon, iconClickTrigger, iconType} = this.props;

        return (
            <div className={this.getIconClass(iconType)}  onClick={iconClickTrigger} style={!this.state.fetchingIcon ? {backgroundImage: `url(${icon.link})`} : undefined} >
                {icon.extension !== "svg" && icon.extension !== "png" ?
                    <div className="pdf-replacement-container">
                        <div className="pdf-replacement">
                            {icon.extension.toLocaleUpperCase()}
                        </div>
                    </div>
                    : this.state.fetchingIcon &&
                    <NavFrontendSpinner className="spinner"/>
                }
            </div>
        );
    }

    private getIconClass (iconType : IconType ) : string{
        return iconType === IconType.IN_LIST ? 'icon-in-list' : 'icon-in-panel';
    }

    private iconDidLoad(){
        this.setState({fetchingIcon: false});
    }

    private iconFetchImage(){
        this.setState({fetchingIcon: true});
        this.state.backgroundImage.onload = this.iconDidLoad;
        this.state.backgroundImage.src = this.props.icon.link;
    }
}

export default Icon;