import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import * as Redux from "react-redux";
import Config from '../../appconfig';
import Language from '../../language/norwegian';
import {
    FetchingInterval,
    ReceiveIconsAction,
    SelectedIconAction, SelectedIconIndexAction,
    setFetchingInterval,
    setSelectedIconIndex
} from "../../redux/actions";
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

const debounce = require('lodash.debounce'); // tslint:disable-line

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
    selectedIconIndex: number,
    setIconIndex: (index:number) => SelectedIconIndexAction;
    setFetchInterval: (fetchFrom: number, fetchTo: number) => FetchingInterval;
}

interface StateTypes{
    numInRow: number,
    setFocus: boolean,
}

class IconList extends React.Component <PropTypes, StateTypes>{

    private readonly container : React.RefObject<HTMLDivElement>;

    constructor(props: PropTypes){
        super(props);
        props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        this.container = React.createRef();
        this.loadMore = this.loadMore.bind(this);
        this.keyDown = debounce(this.keyDown.bind(this), 25);
        this.measure = debounce(this.measure.bind(this), 500);
        this.state = {
            numInRow: -1,
            setFocus: false,
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
        }

        if(this.props.icons !== props.icons){
            this.measure();
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

    public shouldComponentUpdate(props: PropTypes){
        return this.props.icons !== props.icons;
    }
    public render() {
        const {icons, fetchingCounter, fetchHasMore} = this.props;
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
                            index={index}
                            icon={icon}/>
                    )}
                </InfiniteScroll>
            </div>

        );
    }

    private measure(){
        if(this.container.current != null && this.props.icons.length) {
            this.setState({
                numInRow:Math.floor(
                    Math.min((this.container.current.offsetWidth - Config.NAV_ICONS_LIST_PADDING * 2)
                        / Config.NAV_ICONS_ELEMENT_WIDTH, this.props.icons.length)
                ),
            });
        }
    }

    private readonly keyDown = (event: KeyboardEvent) => {

        let {selectedIconIndex} = this.props;
        const {icons, selectedIcon, fetchIcon, iconStyle, setIconIndex} = this.props;
        const {numInRow} = this.state;

        if(selectedIcon){
            // Check if user has pushed arrow buttons and calculate new position
            switch (event.key){
                case 'ArrowUp':
                    if(selectedIconIndex - numInRow >= 0){
                        selectedIconIndex-= numInRow;
                    }else{
                        selectedIconIndex = 0;
                    }
                    break;
                case 'ArrowRight':
                    if(selectedIconIndex + 1 <= icons.length){
                        selectedIconIndex++;
                    }
                    break;
                case 'ArrowDown':
                    if(selectedIconIndex + numInRow <= icons.length){
                        selectedIconIndex+= numInRow;
                    }else{
                        selectedIconIndex = icons.length - 1;
                    }
                    break
                case 'ArrowLeft':
                    if(selectedIconIndex - 1 >= 0){
                        selectedIconIndex--;
                    }
                    break;
            }

            // Fetch new icon with new position
            if(icons[selectedIconIndex]){
                fetchIcon(icons[selectedIconIndex].id, iconStyle);
                setIconIndex(selectedIconIndex);
            }
        }
    }

    private loadMore() {
        if(this.props.icons.length > 0){
            const fetchFrom = this.props.fetchTo;
            const fetchTo = this.props.fetchTo + Config.NAV_ICONS_FETCH_INTERVAL_SIZE;
            this.props.setFetchInterval(fetchFrom, fetchTo)
        }
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
        selectedIconIndex: state.iconsStore.selectedIconIndex,
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcon : (filename:string, style: IconStyle)  => api.fetchIcon(filename, style)(dispatch),
    fetchIcons : ( iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText:string)  => api.fetchIcons(iconStyle, fetchFrom, fetchTo, searchText)(dispatch),
    setFetchInterval : ( fetchFrom: number, fetchTo: number)  => dispatch(setFetchingInterval(fetchFrom, fetchTo)),
    setIconIndex: (index: number) => dispatch(setSelectedIconIndex(index)),
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconList);