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
    setFocus: boolean,
}

class IconList extends React.Component <PropTypes, StateTypes>{

    private readonly container : React.RefObject<HTMLDivElement>;
    private readonly selectedElement : React.RefObject<HTMLButtonElement>;

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
            setFocus: false,
        }
    }

    public measure(){
        if(this.container.current != null && this.props.icons.length) {
          this.setState({
                numInRow:Math.floor(
                    Math.min((this.container.current.offsetWidth - Config.NAV_ICONS_LIST_PADDING * 2)
                        / Config.NAV_ICONS_ELEMENT_WIDTH, this.props.icons.length)
                ),
            });
        }
    }

    public componentWillReceiveProps(props: PropTypes){

        // Fetch from API if changes in state
        if (this.props.searchText !== props.searchText ||
            this.props.iconStyle !== props.iconStyle  ||
            this.props.fetchFrom !== props.fetchFrom ||
            this.props.fetchTo !== props.fetchTo
        ) {
            props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        }

        // Always set the first element in the list to active
        if(this.props.icons !== props.icons && props.icons[0] && props.icons.length <= Config.NAV_ICONS_FETCH_INTERVAL_SIZE){
            props.fetchIcon(props.icons[0].id, props.iconStyle);
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

            // Find current icon position
            icons.forEach((icon, index) => {
                if(selectedIcon.id === icon.id){
                    iconIndex = index;
                }
            });

            // Check if user has pushed arrow buttons and calculate new position
            switch (event.key){
                case 'ArrowUp':
                    if(icons[iconIndex - numInRow]){
                        iconIndex-= numInRow;
                    }else{
                        iconIndex = 0;
                    }
                    break;
                case 'ArrowRight':
                    if(icons[iconIndex + 1]){
                        iconIndex++;
                    }
                    break;
                case 'ArrowDown':
                    if(icons[iconIndex + numInRow]){
                        iconIndex+= numInRow;
                    }else{
                        iconIndex = icons.length - 1;
                    }
                    break
                case 'ArrowLeft':
                    if(icons[iconIndex - 1]){
                        iconIndex--;
                    }
                    break;
            }

            // Fetch new icon with new position
            if(icons[iconIndex]){
                fetchIcon(icons[iconIndex].id, iconStyle);
                this.scrollToIcon();
            }

            // Only set focus if user has pushed the arrows
            switch(event.key){
                case 'ArrowUp':
                case 'ArrowDown':
                    // Prevent defaults scrolling
                    event.preventDefault();
                case 'ArrowRight':
                case 'ArrowLeft':
                    // Allow focus to be set when using arrows
                    this.setState({setFocus: true});
                    break;
                default:
                    this.setState({setFocus: false});
                    break;
            }
        }

    }

    public scrollToIcon(){
        if(this.selectedElement.current != null) {
           scroll.scrollTo(this.selectedElement.current.offsetTop - (window.innerHeight / 3), { duration : 100});
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
                            setFocus={this.state.setFocus}
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