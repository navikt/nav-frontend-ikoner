import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from 'react';
import * as InfiniteScroll from 'react-infinite-scroll-component';
import * as Redux from "react-redux";
import Config from '../../appconfig';
import Language from '../../language/norwegian';
import {FetchingInterval, ReceiveIconsAction, setFetchingInterval} from "../../redux/actions";
import {
    IconBasic,
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
    fetchIcons: (iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText: string) => Promise<ReceiveIconsAction>;
    fetchFrom: number;
    fetchHasMore: boolean;
    fetchTo: number;
    fetchingCounter: number;
    setFetchInterval: (fetchFrom: number, fetchTo: number) => FetchingInterval;
}

class IconList extends React.Component <PropTypes> {

    constructor(props: PropTypes) {
        super(props);
        props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        this.loadMore = this.loadMore.bind(this);
    }

    public componentWillReceiveProps(props: PropTypes) {
        if (this.props.searchText !== props.searchText ||
            this.props.iconStyle !== props.iconStyle ||
            this.props.fetchFrom !== props.fetchFrom ||
            this.props.fetchTo !== props.fetchTo
        ) {
            props.fetchIcons(props.iconStyle, props.fetchFrom, props.fetchTo, props.searchText);
        }
    }

    public loadMore() {
        if (this.props.icons.length > 0) {
            const fetchFrom = this.props.fetchTo;
            const fetchTo = this.props.fetchTo + Config.NAV_ICONS_FETCH_INTERVAL_SIZE;
            this.props.setFetchInterval(fetchFrom, fetchTo)
        }
    }

    public render() {
        const {icons, fetchingCounter, fetchHasMore} = this.props;
        return (
            <InfiniteScroll
                dataLength={icons.length}
                endMessage={icons.length === 0 && fetchingCounter === 0 ?
                    <div className="no-results">{Language.NO_RESULTS}</div> : undefined}
                next={this.loadMore}
                hasMore={fetchHasMore}
                loader={<div className="icon-list-spinner"><NavFrontendSpinner/></div>}>
                {icons.map((icon: IconBasic, index: number) =>
                    <IconSelect key={index}
                                id={icon.id}
                                title={icon.title}
                                imageLink={icon.link}
                                extension={icon.extension}/>
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
    };
};

const mapDispatchToProps = (dispatch: Redux.Dispatch) => ({
    fetchIcons: (iconStyle: IconStyle, fetchFrom: number, fetchTo: number, searchText: string) => api.fetchIcons(iconStyle, fetchFrom, fetchTo, searchText)(dispatch),
    setFetchInterval: (fetchFrom: number, fetchTo: number) => dispatch(setFetchingInterval(fetchFrom, fetchTo)),
});

export default Redux.connect(mapStateToProps, mapDispatchToProps)(IconList);