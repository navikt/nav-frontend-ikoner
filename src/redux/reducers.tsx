import {RECEIVE_ICONS} from "./actions";

const initialState = {
    icons: {
        fetching: false,
        lastUpdated: null,
        list: [],
    }
}

export function icons(state = initialState, action: any) {
    switch (action.type) {
        case RECEIVE_ICONS:
            return Object.assign({}, state, {
                icons: {
                    fetching: false,
                    lastUpdated: Date.now(),
                    list: action.icons,
                }
            })
        default:
            return state
    }
}