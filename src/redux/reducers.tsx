import {RECEIVE_ICONS} from "./actions";

const initialState = {
    fetching: false,
    icons: [],
    lastUpdated: null,
    search: '',
}

export function iconsReducer(state = initialState, action: any) {
    switch (action.type) {
        case RECEIVE_ICONS:
            const data = {
                fetching: false,
                icons: action.icons,
                lastUpdated: Date.now(),
            };
            return {...state, ...data};
        default:
            return state
    }
}