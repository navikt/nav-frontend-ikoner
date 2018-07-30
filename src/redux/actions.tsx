import * as loadash from "lodash";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import Language from "../language/norwegian";
import * as api from "../utils/api";
import {
  RECEIVE_ICONS,
  RECEIVE_TAGS,
  SET_FETCH_INTERVAL,
  SET_FETCHING_ICONS,
  SET_ICON_BACKGROUND_COLOR,
  SET_ICON_COLOR,
  SET_ICON_STYLE,
  SET_SEARCH_TEXT,
  SET_SELECTED_ICON,
  SET_SELECTED_ICON_INDEX,
  TOGGLE_CHOSEN_EXTENSION
} from "./actions-constants";
import {
  ChosenExtensions,
  FetchingIconsAction,
  FetchingInterval,
  IconColorAction,
  IconColorBackgroundAction,
  IconColorStyle,
  ReceiveIconsAction,
  ReceiveTagsAction,
  SearchTextAction,
  SelectedIconAction,
  SelectedIconIndexAction
} from "./actions-interfaces";
import {
  IconExpanded,
  Icons,
  IconsResult,
  IconStyle,
  Store,
  Tags
} from "./store-interfaces";

const debounce = loadash.debounce;

export function receiveIcons(
  icons: Icons,
  numberOfIcons: number
): ReceiveIconsAction {
  return { type: RECEIVE_ICONS, icons, numberOfIcons };
}

export function receiveTags(tags: Tags): ReceiveTagsAction {
  return { type: RECEIVE_TAGS, tags };
}

export function setSelectedIcon(
  icon: IconExpanded | undefined
): SelectedIconAction {
  return { type: SET_SELECTED_ICON, icon };
}

export function setSelectedIconIndex(index: number): SelectedIconIndexAction {
  return { type: SET_SELECTED_ICON_INDEX, index };
}

export function setSearchText(
  searchText: string
): ThunkAction<void, Store, {}, SearchTextAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      const store = getState().iconsStore;
      dispatch({ type: SET_SEARCH_TEXT, searchText });
      dispatch(fetchIcons(store.fetchFrom, store.fetchTo, searchText));
    }
  );
}

export function setIconColor(iconColor: string): IconColorAction {
  return { type: SET_ICON_COLOR, iconColor };
}

export function setIconStyle(
  iconStyle: IconStyle
): ThunkAction<void, Store, {}, IconColorStyle> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      dispatch({ type: SET_ICON_STYLE, iconStyle });
      dispatch(fetchIcons());
    }
  );
}

export function setIconBackgroundColor(
  iconBackgroundColor: string
): IconColorBackgroundAction {
  return { type: SET_ICON_BACKGROUND_COLOR, iconBackgroundColor };
}

export function setFetchingIcons(): FetchingIconsAction {
  return { type: SET_FETCHING_ICONS };
}

export function setFetchingInterval(
  fetchFrom: number,
  fetchTo: number
): ThunkAction<void, Store, {}, FetchingInterval> {
  return dispatch => {
    dispatch({ type: SET_FETCH_INTERVAL, fetchFrom, fetchTo });
    dispatch(fetchIcons(fetchFrom, fetchTo));
  };
}

export function fetchTags(): ThunkAction<void, Store, {}, ReceiveTagsAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      api
        .fetchTags()
        .then(response => response.json())
        .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
        .then(json => dispatch(receiveTags(json)));
    }
  );
}

export function insertTag(
  tag: string,
  icon: string
): ThunkAction<void, Store, {}, ReceiveTagsAction | SelectedIconAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      api
        .insertTag(tag, icon)
        .then(response => response.json())
        .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
        .then(() => dispatch(fetchTags()))
        .then(() => dispatch(fetchIcon(icon)));
    }
  );
}

export function deleteTag(
  tag: string,
  icon: string
): ThunkAction<void, Store, {}, ReceiveTagsAction | SelectedIconAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      api
        .deleteTag(tag)
        .then(response => response.json())
        .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
        .then(() => dispatch(fetchIcon(icon)))
        .then(() => dispatch(fetchTags()));
    }
  );
}

export function editIcon(
  id: string,
  title: string,
  description: string
): ThunkAction<void, Store, {}, ReceiveTagsAction | SelectedIconAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      api
        .editIcon(id, title, description)
        .then(response => response.json())
        .catch(error => console.log(Language.AN_ERROR_HAS_ACCURED, error))
        .then(() => dispatch(fetchIcon(id)));
    }
  );
}

export function fetchIcon(
  id: string
): ThunkAction<void, Store, {}, SelectedIconAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      const store = getState().iconsStore;
      api
        .fetchIcon(store.iconStyle, id)
        .then((response: Response) => response.json())
        .catch((error: Error) =>
          console.log(Language.AN_ERROR_HAS_ACCURED, error)
        )
        .then((json: IconExpanded) => dispatch(setSelectedIcon(json)));
    }
  );
}

export function fetchIcons(
  fetchFrom?: number,
  fetchTo?: number,
  searchText?: string
): ThunkAction<void, Store, {}, ReceiveIconsAction | FetchingIconsAction> {
  return debounce(
    (dispatch: ThunkDispatch<Store, {}, any>, getState: () => Store) => {
      dispatch(setFetchingIcons());
      const store = getState().iconsStore;
      api
        .fetchIcons(
          store.iconStyle,
          fetchFrom ? fetchFrom : store.fetchFrom,
          fetchTo ? fetchTo : store.fetchTo,
          searchText ? searchText : store.searchText
        )
        .then((response: Response) => response.json())
        .catch((error: Error) =>
          console.log(Language.AN_ERROR_HAS_ACCURED, error)
        )
        .then((json: IconsResult) =>
          dispatch(receiveIcons(json.icons, json.numberOfIcons))
        )
        .then((json: IconsResult) => {
          if (json.icons.length && !fetchFrom && searchText) {
            dispatch(fetchIcon(json.icons[0].id));
          }
          if (!json.icons.length) {
            dispatch(setSelectedIcon(undefined));
          }
        });
    }
  );
}

export function toggleChosenExtension(
  event: React.ChangeEvent<HTMLInputElement>
): ChosenExtensions {
  const extension: string = event.currentTarget.id;
  return { type: TOGGLE_CHOSEN_EXTENSION, extension };
}
