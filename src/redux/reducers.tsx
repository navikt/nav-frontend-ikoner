import {RECEIVE_ICONS} from "./actions";

const initialState = {
    icons: {
        fetching: false,
        lastUpdated: null,
        list: [{title:"icon1", link: "https://lol"}],
    }
}

export function icons(state = initialState, action: any) {
    switch (action.type) {
        case RECEIVE_ICONS:
            return Object.assign({}, state, {
                icons: {
                    fetching: false,
                    icons: action.icons,
                    lastUpdated: Date.now()
                }
            })
        default:
            return state
    }
}