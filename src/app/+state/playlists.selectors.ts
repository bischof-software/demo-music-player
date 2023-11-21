import {createFeatureSelector, createSelector} from '@ngrx/store';
import {PLAYLISTS_FEATURE_KEY, playlistsAdapter, PlaylistsState,} from './playlists.reducer';

// Lookup the 'Playlists' feature state managed by NgRx
export const selectPlaylistsState = createFeatureSelector<PlaylistsState>(
    PLAYLISTS_FEATURE_KEY
);

const {selectAll, selectEntities} = playlistsAdapter.getSelectors();

export const selectPlaylistsLoaded = createSelector(
    selectPlaylistsState,
    (state: PlaylistsState) => state.loaded
);

export const selectPlaylistsError = createSelector(
    selectPlaylistsState,
    (state: PlaylistsState) => state.error
);

export const selectAllPlaylists = createSelector(
    selectPlaylistsState,
    (state: PlaylistsState) => selectAll(state)
);

export const selectPlaylistsEntities = createSelector(
    selectPlaylistsState,
    (state: PlaylistsState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
    selectPlaylistsState,
    (state: PlaylistsState) => state.selectedId
);

export const selectEntity = createSelector(
    selectPlaylistsEntities,
    selectSelectedId,
    (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
export const selectEntityWithId = (playlist: string) =>
    createSelector(
        selectPlaylistsEntities,
        selectSelectedId,
        (entities) =>  entities[playlist]
    );