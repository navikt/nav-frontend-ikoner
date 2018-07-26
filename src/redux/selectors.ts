import {Store} from "./store-interfaces";

export function getChosenExtensions(state: Store) {
    return Object.keys(state.iconsStore.chosenExtensions)
        .filter((key) => state.iconsStore.chosenExtensions[key]);
}