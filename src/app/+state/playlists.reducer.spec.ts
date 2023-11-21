import {Action} from '@ngrx/store';

import * as PlaylistsActions from './playlists.actions';
import {PlaylistsEntity} from './playlists.models';
import {initialPlaylistsState, playlistsReducer, PlaylistsState,} from './playlists.reducer';

describe('Playlists Reducer', () => {
    const createPlaylistsEntity = (id: string, name = ''): PlaylistsEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe('valid Playlists actions', () => {
        it('loadPlaylistsSuccess should return the list of known Playlists', () => {
            const playlists = [
                createPlaylistsEntity('PRODUCT-AAA'),
                createPlaylistsEntity('PRODUCT-zzz'),
            ];
            const action = PlaylistsActions.loadPlaylistsSuccess({playlists});

            const result: PlaylistsState = playlistsReducer(
                initialPlaylistsState,
                action
            );

            expect(result.loaded).toBe(true);
            expect(result.ids.length).toBe(2);
        });
    });

    describe('unknown action', () => {
        it('should return the previous state', () => {
            const action = {} as Action;

            const result = playlistsReducer(initialPlaylistsState, action);

            expect(result).toBe(initialPlaylistsState);
        });
    });
});
