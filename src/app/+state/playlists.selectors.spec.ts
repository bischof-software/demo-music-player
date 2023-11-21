import {PlaylistsEntity} from './playlists.models';
import {initialPlaylistsState, playlistsAdapter, PlaylistsPartialState,} from './playlists.reducer';
import * as PlaylistsSelectors from './playlists.selectors';

describe('Playlists Selectors', () => {
    const ERROR_MSG = 'No Error Available';
    const getPlaylistsId = (it: PlaylistsEntity) => it.id;
    const createPlaylistsEntity = (id: string, name = '') =>
        ({
            id,
            name: name || `name-${id}`,
        } as PlaylistsEntity);

    let state: PlaylistsPartialState;

    beforeEach(() => {
        state = {
            playlists: playlistsAdapter.setAll(
                [
                    createPlaylistsEntity('PRODUCT-AAA'),
                    createPlaylistsEntity('PRODUCT-BBB'),
                    createPlaylistsEntity('PRODUCT-CCC'),
                ],
                {
                    ...initialPlaylistsState,
                    selectedId: 'PRODUCT-BBB',
                    error: ERROR_MSG,
                    loaded: true,
                }
            ),
        };
    });

    describe('Playlists Selectors', () => {
        it('selectAllPlaylists() should return the list of Playlists', () => {
            const results = PlaylistsSelectors.selectAllPlaylists(state);
            const selId = getPlaylistsId(results[1]);

            expect(results.length).toBe(3);
            expect(selId).toBe('PRODUCT-BBB');
        });

        it('selectEntity() should return the selected Entity', () => {
            const result = PlaylistsSelectors.selectEntity(state) as PlaylistsEntity;
            const selId = getPlaylistsId(result);

            expect(selId).toBe('PRODUCT-BBB');
        });

        it('selectPlaylistsLoaded() should return the current "loaded" status', () => {
            const result = PlaylistsSelectors.selectPlaylistsLoaded(state);

            expect(result).toBe(true);
        });

        it('selectPlaylistsError() should return the current "error" state', () => {
            const result = PlaylistsSelectors.selectPlaylistsError(state);

            expect(result).toBe(ERROR_MSG);
        });
    });
});
