import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from 'react';
import * as InfiniteScroll  from 'react-infinite-scroller';
import * as Redux from "react-redux";
import Config from '../../appconfig';
import Language from '../../language/norwegian';
import {setFetchingInterval} from "../../redux/actions";
import {Icon as IIcon, Icons, IconStyle, SearchText, Store} from "../../redux/store-interfaces";
import api from "../../utils/api";
import IconSelect from '../misc/icon-select';
import './lists.less';

interface PropTypes { iconStyle: IconStyle, icons: Icons, searchText: SearchText, fetchIcons: typeof api.fetchIcons, fetchFrom: number, fetchHasMore: boolean, fetchTo: number, fetchingCounter: number, setFetchInterval: typeof setFetchingInterval}
interface StateTypes {hasMore: boolean}

class IconList extends React.Component <PropTypes,StateTypes>{

    constructor(props: any){
        super(props);
        props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo);
        this.loadMore = this.loadMore.bind(this);
    }

    public componentWillReceiveProps(props: PropTypes){
        if (this.props.searchText !== props.searchText ||
            this.props.iconStyle !== props.iconStyle  ||
            this.props.fetchFrom !== props.fetchFrom ||
            this.props.fetchTo !== props.fetchTo
        ) {
            console.log("FetchHasMore " + this.props.fetchHasMore);
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

    public render() {
        return (
            <InfiniteScroll
                className="icon-list"
                pageStart={0}
                initialLoad={false}
                loadMore={this.loadMore}
                hasMore={this.props.fetchHasMore} >
                {this.props.icons.length === 0 && this.props.fetchingCounter === 0 &&
                    <div className="no-results">{Language.NO_RESULTS}</div>
                }
                {this.props.icons.length === 0 && this.props.fetchingCounter > 0 &&
                    <div className="spinner-container"><NavFrontendSpinner /></div>
                }
                {this.props.icons.map((icon:IIcon, index: number) =>
                    <IconSelect key={index} icon={icon} />)}
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

    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcons : ( iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText:string)  => api.fetchIcons(iconStyle, fetchFrom, fetchTo, searchText)(dispatch),
    setFetchInterval : ( fetchFrom: number, fetchTo: number)  => dispatch(setFetchingInterval(fetchFrom, fetchTo)),
});


export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconList);