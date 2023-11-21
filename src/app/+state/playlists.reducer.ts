import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';

import * as PlaylistsActions from './playlists.actions';
import {PlaylistsEntity} from './playlists.models';
import {Playlist} from "../model/playlist";

export const PLAYLISTS_FEATURE_KEY = 'playlists';

export interface PlaylistsState extends EntityState<PlaylistsEntity> {
    selectedId?: string; // which Playlists record has been selected
    loaded: boolean; // has the Playlists list been loaded
    error?: string | null; // last known error (if any)
    selectedPlaylist?: Playlist;
}

export interface PlaylistsPartialState {
    readonly [PLAYLISTS_FEATURE_KEY]: PlaylistsState;
}

export const playlistsAdapter: EntityAdapter<PlaylistsEntity> =
    createEntityAdapter<PlaylistsEntity>();

export const initialPlaylistsState: PlaylistsState =
    playlistsAdapter.getInitialState({
        // set initial required properties
        loaded: false,
    });

const reducer = createReducer(
    initialPlaylistsState,
    on(PlaylistsActions.initPlaylists, (state) => ({
        ...state,
        loaded: false,
        error: null,
    })),
    on(PlaylistsActions.loadPlaylistsSuccess, (state, {playlists}) =>
        playlistsAdapter.setAll(playlists, {...state, loaded: true})
    ),
    on(PlaylistsActions.loadPlaylistsFailure, (state, {error}) => ({
        ...state,
        error,
    })),
    on(PlaylistsActions.selectPlaylist, (state, {playlistName}) => ({
        ...state,
        selectedId: playlistName,
    })),
    on(PlaylistsActions.renamedPlaylist, (state, {playlist}) =>
        playlistsAdapter.addOne(playlist, {...state, loaded: true, selectedId: playlist.id})
    ),
    on(PlaylistsActions.removePlaylist, (state, {playlistName}) =>
        playlistsAdapter.removeOne(playlistName, state,)
    ),
    on(PlaylistsActions.addPlaylist, (state, {playlistName}) =>
        playlistsAdapter.addOne({id: playlistName, playlist: {name: playlistName, tracks: []}}, {...state, loaded: true})
    ),
    on(PlaylistsActions.updatedPlaylist, (state, {playlist}) =>
        playlistsAdapter.upsertOne(playlist, {...state})
    ),
);

export function playlistsReducer(
    state: PlaylistsState | undefined,
    action: Action
) {
    return reducer(state, action);
}
