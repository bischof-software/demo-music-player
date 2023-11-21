import {Action, ActionReducer, ActionReducerMap, MetaReducer} from "@ngrx/store";
import {PLAYLISTS_FEATURE_KEY, PlaylistsPartialState, playlistsReducer} from "./+state/playlists.reducer";
// @ts-ignore
import * as merge from "lodash/merge";
import {localStorageSync} from "ngrx-store-localstorage";

export const reducers: ActionReducerMap<PlaylistsPartialState> = {
    [PLAYLISTS_FEATURE_KEY]: playlistsReducer
};

const INIT_ACTION = "@ngrx/store/init";
const UPDATE_ACTION = "@ngrx/store/update-reducers";
const EFFECTS_ACTION = "@ngrx/effects/init";
const mergeReducer = (
    state: PlaylistsPartialState,
    rehydratedState: PlaylistsPartialState,
    action: Action
) => {
    if ((action.type === INIT_ACTION || action.type === UPDATE_ACTION || action.type === EFFECTS_ACTION) && rehydratedState) {
        state = merge(state, rehydratedState);
    }
    return state;
};

function localStorageSyncReducer(
    reducer: ActionReducer<PlaylistsPartialState>
): ActionReducer<PlaylistsPartialState> {
    return localStorageSync({
        keys: [PLAYLISTS_FEATURE_KEY],
        rehydrate: true,
        mergeReducer
    })(reducer);
}

export const metaReducers: Array<MetaReducer<PlaylistsPartialState, any>> = [localStorageSyncReducer];

