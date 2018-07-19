import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import * as Redux from "react-redux";
import Config from '../../appconfig';
import Language from '../../language/norwegian';
import {FetchingInterval, ReceiveIconsAction, SelectedIconAction, setFetchingInterval} from "../../redux/actions";
import {
    IconBasic, IconExpanded,
    Icons,
    IconStyle,
    SearchText,
    Store
} from "../../redux/store-interfaces";
import api from "../../utils/api";
import IconSelect from '../misc/icon-select';
import './lists.less';

interface PropTypes {
    iconStyle: IconStyle;
    icons: Icons;
    searchText: SearchText;
    fetchIcon: (filename:string, style: IconStyle) => Promise<SelectedIconAction>;
    fetchIcons: (iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText:string) => Promise<ReceiveIconsAction>;
    fetchFrom: number;
    fetchHasMore: boolean;
    fetchTo: number;
    fetchingCounter: number;
    selectedIcon: IconExpanded,
    setFetchInterval: (fetchFrom: number, fetchTo: number) => FetchingInterval;
}

class IconList extends React.Component <PropTypes>{

    constructor(props: PropTypes){
        super(props);
        props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        this.loadMore = this.loadMore.bind(this);
        this.keyDown = this.keyDown.bind(this);
    }

    public componentWillMount(){
        document.addEventListener("keydown", this.keyDown);
    }

    public componentWillUnmount() {
        document.removeEventListener("keydown", this.keyDown);
    }

    public componentWillReceiveProps(props: PropTypes){
        if (this.props.searchText !== props.searchText ||
            this.props.iconStyle !== props.iconStyle  ||
            this.props.fetchFrom !== props.fetchFrom ||
            this.props.fetchTo !== props.fetchTo
        ) {
            props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        }
    }

    public loadMore() {
        if(this.props.icons.length > 0){
            const fetchFrom = this.props.fetchTo;
            const fetchTo = this.props.fetchTo + Config.NAV_ICONS_FETCH_INTERVAL_SIZE;
            this.props.setFetchInterval(fetchFrom, fetchTo)
        }
    }

    public keyDown = (event: KeyboardEvent) => {

        const {icons, selectedIcon, fetchIcon, iconStyle} = this.props;

        if(selectedIcon){

            let iconIndex = 0;
            icons.forEach((icon, index) => {
                if(selectedIcon.id === icon.id){
                    iconIndex = index;
                }
            });

            switch (event.key){
                case 'ArrowUp':
                    console.log("Up");
                    break;
                case 'ArrowRight':
                    console.log("Right");
                    if(iconIndex + 1 <= icons.length){
                        iconIndex++;
                    }
                    break;
                case 'ArrowDown':
                    console.log("Down");
                    break;
                case 'ArrowLeft':
                    console.log("Left");
                    if(iconIndex - 1 >= 0){
                        iconIndex--;
                    }
                    break;
            }
            fetchIcon(icons[iconIndex].id, iconStyle);
        }

    }

    public render() {
        const {icons, fetchingCounter, fetchHasMore, selectedIcon} = this.props;
        return (
            <InfiniteScroll
                endMessage={!icons.length && !fetchingCounter ? <div className="no-results">{Language.NO_RESULTS}</div> : undefined}
                loader={<div className="icon-list-spinner"><NavFrontendSpinner /></div>}
                dataLength={icons.length}
                hasMore={fetchHasMore}
                next={this.loadMore} >
                {icons.map((icon:IconBasic, index: number) =>
                    <IconSelect
                        key={index}
                        id={icon.id}
                        title={icon.title}
                        imageLink={icon.link}
                        extension={icon.extension}
                        selected={selectedIcon && icon.id === selectedIcon.id}/>
                )}
            </InfiniteScroll>
        );
    }
}

const mapStateToProps = (state: Store) => {
    return {
        fetchFrom: state.iconsStore.fetchFrom,
        fetchHasMore: state.iconsStore.fetchHasMore,
        fetchTo: state.iconsStore.fetchTo,
        fetchingCounter: state.iconsStore.fetchingCounter,
        iconStyle: state.iconsStore.iconStyle,
        icons: state.iconsStore.icons,
        searchText: state.iconsStore.searchText,
        selectedIcon: state.iconsStore.selectedIcon,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcon : (filename:string, style: IconStyle)  => api.fetchIcon(filename, style)(dispatch),
    fetchIcons : ( iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText:string)  => api.fetchIcons(iconStyle, fetchFrom, fetchTo, searchText)(dispatch),
    setFetchInterval : ( fetchFrom: number, fetchTo: number)  => dispatch(setFetchingInterval(fetchFrom, fetchTo)),
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconList);