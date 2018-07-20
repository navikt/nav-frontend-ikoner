import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import * as Redux from "react-redux";
import * as Scroll from 'react-scroll';
const debounce = require('lodash.debounce'); // tslint:disable-line
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

const scroll = Scroll.animateScroll;

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

interface StateTypes{
    numInRow: number,
}

class IconList extends React.Component <PropTypes, StateTypes>{

    private container : React.RefObject<HTMLDivElement>;
    private selectedElement : React.RefObject<HTMLButtonElement>;

    constructor(props: PropTypes){
        super(props);
        props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        this.container = React.createRef();
        this.selectedElement = React.createRef();
        this.loadMore = this.loadMore.bind(this);
        this.keyDown = this.keyDown.bind(this);
        this.measure = debounce(this.measure.bind(this));
        this.scrollToIcon = debounce(this.scrollToIcon.bind(this), 250);
        this.state = {
            numInRow: -1,
        }
    }

    public measure(){
        if(this.container.current != null) {
          this.setState({
                numInRow:Math.floor(
                    Math.min((this.container.current.offsetWidth - Config.NAV_ICONS_LIST_PADDING * 2)
                        / Config.NAV_ICONS_ELEMENT_WIDTH, this.props.icons.length)
                ),
            });
        }
    }

    public componentWillMount(){
        window.addEventListener("resize", this.measure);
        document.addEventListener("keydown", this.keyDown);
    }

    public componentWillUnmount() {
        window.removeEventListener("resize", this.measure);
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
        if(this.props.icons){
            this.measure();
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
        const {numInRow} = this.state;
        let iconIndex = 0;

        if(selectedIcon){
            icons.forEach((icon, index) => {
                if(selectedIcon.id === icon.id){
                    iconIndex = index;
                }
            });

            switch (event.key){
                case 'ArrowUp':
                    if(iconIndex - numInRow >= 0){
                        iconIndex-= numInRow;
                    }else{
                        iconIndex = 0;
                    }
                    break;
                case 'ArrowRight':
                    if(iconIndex + 1 <= icons.length){
                        iconIndex++;
                    }
                    break;
                case 'ArrowDown':
                    if(iconIndex + numInRow <= icons.length){
                        iconIndex+= numInRow;
                    }else{
                        iconIndex = icons.length;
                    }
                    break;
                case 'ArrowLeft':
                    if(iconIndex - 1 >= 0){
                        iconIndex--;
                    }
                    break;
            }
            fetchIcon(icons[iconIndex].id, iconStyle);
            this.scrollToIcon();
        }
    }

    public scrollToIcon(){
        if(this.selectedElement.current != null) {
            scroll.scrollTo(this.selectedElement.current.offsetTop - (window.innerHeight / 3), { duration : 150});
        }
    }

    public render() {
        const {icons, fetchingCounter, fetchHasMore, selectedIcon} = this.props;

        return (
            <div ref={this.container}>
                <InfiniteScroll
                    endMessage={!icons.length && !fetchingCounter ? <div className="no-results">{Language.NO_RESULTS}</div> : undefined}
                    loader={<div className="icon-list-spinner"><NavFrontendSpinner /></div>}
                    dataLength={icons.length}
                    hasMore={fetchHasMore}
                    next={this.loadMore} >
                    {icons.map((icon:IconBasic, index: number) =>
                        <IconSelect
                            key={index}
                            icon={icon}
                            reference={this.selectedElement}
                            selected={selectedIcon && icon.id === selectedIcon.id}/>
                    )}
                </InfiniteScroll>
            </div>

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