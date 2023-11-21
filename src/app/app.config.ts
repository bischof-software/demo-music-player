import {ApplicationConfig, isDevMode, LOCALE_ID} from '@angular/core';
import {provideRouter, withEnabledBlockingInitialNavigation,} from '@angular/router';
import {appRoutes} from './app.routes';
import {provideAnimations} from '@angular/platform-browser/animations';
import {Action, ActionReducer, ActionReducerMap, MetaReducer, provideState, provideStore} from '@ngrx/store';
import {provideEffects} from '@ngrx/effects';
import {provideStoreDevtools} from '@ngrx/store-devtools';
import * as fromPlaylists from './+state/playlists.reducer';
import {PLAYLISTS_FEATURE_KEY, PlaylistsPartialState, playlistsReducer} from './+state/playlists.reducer';
import {PlaylistsEffects} from './+state/playlists.effects';
import {PlaylistsFacade} from './+state/playlists.facade';
import {registerLocaleData} from "@angular/common";
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {localStorageSync} from "ngrx-store-localstorage";
// @ts-ignore
import * as merge from 'lodash/merge';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

const reducers: ActionReducerMap<PlaylistsPartialState> = {
    [PLAYLISTS_FEATURE_KEY]: playlistsReducer
};

const INIT_ACTION = "@ngrx/store/init";
const UPDATE_ACTION = "@ngrx/store/update-reducers";
const mergeReducer = (
    state: PlaylistsPartialState,
    rehydratedState: PlaylistsPartialState,
    action: Action
) => {
    if (
        (action.type === INIT_ACTION || action.type === UPDATE_ACTION) &&
        rehydratedState
    ) {
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

const metaReducers: Array<MetaReducer<PlaylistsPartialState, any>> = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
    providers: [
        provideStore(reducers, {metaReducers}),
        provideEffects(PlaylistsEffects),
        provideState(
            fromPlaylists.PLAYLISTS_FEATURE_KEY,
            fromPlaylists.playlistsReducer,
        ),
        PlaylistsFacade,
        provideStoreDevtools({
            maxAge: 25, // Retains last 25 states
            logOnly: !isDevMode(), // Restrict extension to log-only mode
            autoPause: true, // Pauses recording actions and state changes when the extension window is not open
            trace: false, //  If set to true, will include stack trace for every dispatched action, so you can see it in trace tab jumping directly to that part of code
            traceLimit: 75, // maximum stack trace frames to be stored (in case trace option was provided as true)
        }),
        provideRouter(appRoutes, withEnabledBlockingInitialNavigation()),
        provideAnimations(),
        {provide: LOCALE_ID, useValue: 'de-De'},
    ],
};
