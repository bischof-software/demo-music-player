import {inject, Injectable} from '@angular/core';
import {select, Store} from '@ngrx/store';

import * as PlaylistsActions from './playlists.actions';
import * as PlaylistsSelectors from './playlists.selectors';
import {map} from "rxjs";
import {Track} from "../model/track";

@Injectable()
export class PlaylistsFacade {
    private readonly store = inject(Store);

    /**
     * Combine pieces of state using createSelector,
     * and expose them as observables through the facade.
     */
    loaded$ = this.store.pipe(select(PlaylistsSelectors.selectPlaylistsLoaded));
    allPlaylists$ = this.store.pipe(
        select(PlaylistsSelectors.selectAllPlaylists),
        map(playlistEntites => playlistEntites.map(playlistEntity => playlistEntity.playlist))
    );
    selectedPlaylists$ = this.store.pipe(select(PlaylistsSelectors.selectEntity), map(selectedEntity => selectedEntity?.playlist));
    selectedPlaylistsName$ = this.store.pipe(select(PlaylistsSelectors.selectSelectedId), map(playlistName => playlistName));
    selectTracksFromPlaylistWithName = (playlist: string) => this.store.pipe(select(PlaylistsSelectors.selectEntityWithId(playlist)), map(selectedEntity => selectedEntity ? selectedEntity.playlist.tracks : []));

    /**
     * Use the initialization action to perform one
     * or more tasks in your Effects.
     */
    init() {
        this.store.dispatch(PlaylistsActions.initPlaylists());
    }

    selectPlaylist = (selectedPlaylist: string | undefined): void =>
        this.store.dispatch(PlaylistsActions.selectPlaylist({playlistName: selectedPlaylist ? selectedPlaylist : ''}))

    addPlaylist = (playlistName: string): void => this.store.dispatch(PlaylistsActions.addPlaylist({playlistName}))
    addTrackToPlaylist = (track: Track): void => this.store.dispatch(PlaylistsActions.addTrackToPlaylist({track}))
    removeTrackFromPlaylist = (track: Track): void => this.store.dispatch(PlaylistsActions.removeTrackFromPlaylist({track}))
    importTracksFromPlaylist = (tracks: Track[]): void => this.store.dispatch(PlaylistsActions.importTracksFromPlaylist({tracks}))
    renamePlaylist = (playlistName: string): void => this.store.dispatch(PlaylistsActions.renamePlaylist({playlistName}))
}
