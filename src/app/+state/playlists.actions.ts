import {createAction, props} from '@ngrx/store';
import {PlaylistsEntity} from './playlists.models';
import {Track} from "../model/track";

export const initPlaylists = createAction('[Playlists Page] Init');

export const loadPlaylistsSuccess = createAction(
    '[Playlists/API] Load Playlists Success',
    props<{ playlists: PlaylistsEntity[] }>()
);

export const loadPlaylistsFailure = createAction(
    '[Playlists/API] Load Playlists Failure',
    props<{ error: any }>()
);

export const selectPlaylist = createAction(
    '[Playlists/API] Select Playlist',
    props<{ playlistName: string }>()
);

export const addPlaylist = createAction(
    '[Playlists/API] Add Playlist',
    props<{ playlistName: string }>()
);
export const removePlaylist = createAction(
    '[Playlists/API] Remove Playlist',
    props<{ playlistName: string }>()
);
export const renamePlaylist = createAction(
    '[Playlists/API] Rename Playlist',
    props<{ playlistName: string }>()
);
export const renamedPlaylist = createAction(
    '[Playlists/API] Renamed Playlist',
    props<{ playlist: PlaylistsEntity, oldPlaylistName: string }>()
);
export const renamedPlaylistFailure = createAction(
    '[Playlists/API] Renamed Playlist failed'
);
export const addTrackToPlaylist = createAction(
    '[Playlists/API] Add Track to Playlist',
    props<{ track: Track }>()
);
export const removeTrackFromPlaylist = createAction(
    '[Playlists/API] Remove Track from Playlist',
    props<{ track: Track }>()
);
export const importTracksFromPlaylist = createAction(
    '[Playlists/API] Import Track from Playlist',
    props<{ tracks: Track[] }>()
);
export const updatedPlaylist = createAction(
    '[Playlists/API] Updated Playlist',
    props<{ playlist: PlaylistsEntity }>()
);

export const updatedPlaylistFailure = createAction(
    '[Playlists/API] Updated Playlist failed'
);