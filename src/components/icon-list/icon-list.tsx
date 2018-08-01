import NavFrontendSpinner from "nav-frontend-spinner";
import * as React from "react";
import * as InfiniteScroll from "react-infinite-scroll-component";
import * as Redux from "react-redux";
import { AnyAction } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Config from "../../appconfig";
import Language from "../../language/norwegian";
import {
  fetchIcon,
  fetchIcons,
  setFetchingInterval,
  setSelectedIconIndex
} from "../../redux/actions";
import {
  FetchingIconsAction,
  FetchingInterval,
  ReceiveIconsAction,
  SelectedIconAction,
  SelectedIconIndexAction
} from "../../redux/actions-interfaces";
import {
  IconBasic,
  IconExpanded,
  Icons,
  IconStyle,
  Store
} from "../../redux/store-interfaces";
import IconSelect from "./icon-element/icon-select";
import "./icon-list.less";

interface PropTypes {
  iconStyle: IconStyle;
  iconColor: string;
  icons: Icons;
  searchText: string;
  fetchIcon: (
    filename: string
  ) => ThunkAction<void, Store, {}, SelectedIconAction>;
  fetchIcons: (
    fetchFrom: number,
    fetchTo: number,
    searchText?: string
  ) => ThunkAction<void, Store, {}, ReceiveIconsAction | FetchingIconsAction>;
  fetchFrom: number;
  fetchHasMore: boolean;
  fetchTo: number;
  fetchingCounter: number;
  selectedIcon: IconExpanded;
  selectedIconIndex: number;
  setIconIndex: (index: number) => SelectedIconIndexAction;
  setFetchInterval: (
    fetchFrom: number,
    fetchTo: number
  ) => ThunkAction<void, Store, {}, FetchingInterval>;
}

class IconList extends React.Component<PropTypes, {}> {
  constructor(props: PropTypes) {
    super(props);
    this.loadMore = this.loadMore.bind(this);
    this.handle = this.handle.bind(this);
  }

  public componentDidMount() {
    const { fetchFrom, fetchTo, searchText } = this.props;
    this.props.fetchIcons(fetchFrom, fetchTo, searchText);
  }

  public handle = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const children = Array.from(container.children) as HTMLElement[];
    const currentFocus = container.querySelector(":focus") as HTMLElement;
    const currentIndex = children.indexOf(currentFocus);
    const iconsOnRow = this.calculateNumOfIconsOnRow(container, currentFocus);

    if (!currentFocus) {
      return;
    }

    let newIndex = -1;
    const actions = {
      ArrowDown: () => {
        if (currentIndex + iconsOnRow < children.length) {
          newIndex = currentIndex + iconsOnRow;
        } else {
          newIndex = children.length - 1;
        }
      },
      ArrowLeft: () => {
        if (currentIndex > 0) {
          newIndex = currentIndex - 1;
        }
      },
      ArrowRight: () => {
        if (currentIndex < children.length - 1) {
          newIndex = currentIndex + 1;
        }
      },
      ArrowUp: () => {
        if (currentIndex - iconsOnRow >= 0) {
          newIndex = currentIndex - iconsOnRow;
        } else {
          newIndex = 0;
        }
      }
    };
    (actions[event.key] || (() => {}))(); // tslint:disable-line
    if (newIndex !== -1) {
      children[newIndex].focus();
      this.props.setIconIndex(newIndex);
      this.props.fetchIcon(this.props.icons[newIndex].id);
    }
  };

  public iconOnclickFactory(index: number): () => void {
    return () => {
      this.props.setIconIndex(index);
      this.props.fetchIcon(this.props.icons[index].id);
    };
  }

  public shouldComponentUpdate(nextProps: PropTypes) {
    return this.props.icons !== nextProps.icons;
  }

  public render() {
    const { icons, fetchingCounter, fetchHasMore } = this.props;
    const iconElements = icons.map((icon: IconBasic, index: number) => (
      <IconSelect
        index={index}
        key={icon.id}
        onClick={this.iconOnclickFactory(index)}
        icon={icon}
      />
    ));

    return (
      <div>
        <InfiniteScroll
          endMessage={
            !icons.length && !fetchingCounter ? (
              <div className="no-results">{Language.NO_RESULTS}</div>
            ) : (
              undefined
            )
          }
          loader={
            <div className="icon-list-spinner">
              <NavFrontendSpinner />
            </div>
          }
          dataLength={icons.length}
          hasMore={fetchHasMore}
          next={this.loadMore}
        >
          <div className="icon-list" onKeyDown={this.handle}>
            {iconElements}
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  private calculateNumOfIconsOnRow(
    container: HTMLElement,
    currentFocus: HTMLElement
  ) {
    const padding: string = window
      .getComputedStyle(container)
      .getPropertyValue("padding");
    return Math.floor(
      (container.clientWidth - 2 * parseInt(padding, 10)) /
        currentFocus.offsetWidth
    );
  }

  private loadMore() {
    if (this.props.icons.length > 0) {
      const fetchFrom = this.props.fetchTo;
      const fetchTo = this.props.fetchTo + Config.NAV_ICONS_FETCH_INTERVAL_SIZE;
      this.props.setFetchInterval(fetchFrom, fetchTo);
    }
  }
}

const mapStateToProps = (state: Store) => {
  return {
    fetchFrom: state.iconsStore.fetchFrom,
    fetchHasMore: state.iconsStore.fetchHasMore,
    fetchTo: state.iconsStore.fetchTo,
    fetchingCounter: state.iconsStore.fetchingCounter,
    iconColor: state.iconsStore.iconColor,
    iconStyle: state.iconsStore.iconStyle,
    icons: state.iconsStore.icons,
    searchText: state.iconsStore.searchText,
    selectedIcon: state.iconsStore.selectedIcon,
    selectedIconIndex: state.iconsStore.selectedIconIndex
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<Store, {}, AnyAction>) => ({
  fetchIcon: (filename: string) => dispatch(fetchIcon(filename)),
  fetchIcons: (fetchFrom: number, fetchTo: number, searchText?: string) =>
    dispatch(fetchIcons(fetchFrom, fetchTo, searchText)),
  setFetchInterval: (fetchFrom: number, fetchTo: number) =>
    dispatch(setFetchingInterval(fetchFrom, fetchTo)),
  setIconIndex: (index: number) => dispatch(setSelectedIconIndex(index))
});

export default Redux.connect(
  mapStateToProps,
  mapDispatchToProps
)(IconList);
