import {TestBed} from '@angular/core/testing';
import {PlaylistsFacade} from './playlists.facade';
import {PlaylistsEntity} from './playlists.models';
import {PlaylistsState,} from './playlists.reducer';
import {firstValueFrom} from "rxjs";
import {MockStore, provideMockStore} from "@ngrx/store/testing";
import {
    selectAllPlaylists,
    selectEntity,
    selectEntityWithId,
    selectPlaylistsEntities,
    selectPlaylistsLoaded,
    selectSelectedId
} from "./playlists.selectors";
import * as PlaylistsActions from "./playlists.actions";

describe('PlaylistsFacade', () => {
    let facade: PlaylistsFacade;
    let store: MockStore<PlaylistsState>;
    let storeDispatchSpy: jest.SpyInstance = jest.fn();

    const initialState = {selectedId: undefined, loaded: false, error: undefined, selectedPlaylist: undefined};

    const createPlaylistsEntity = (id: string): PlaylistsEntity => ({
        id,
        playlist: {
            name: id,
            tracks: [{
                title: 'title',
                artist: 'artist',
                duration: 123,
                album: 'album'
            }]
        }
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                PlaylistsFacade,
                provideMockStore({
                    selectors: [
                        {
                            selector: selectPlaylistsLoaded,
                            value: false
                        },
                        {
                            selector: selectAllPlaylists,
                            value: [createPlaylistsEntity('test-selectAllPlaylists')]
                        },
                        {
                            selector: selectEntity,
                            value: createPlaylistsEntity('test-selectEntity')
                        },
                        {
                            selector: selectEntityWithId('test-selectEntityWithId'),
                            value: createPlaylistsEntity('test-selectEntityWithId')
                        },
                        {
                            selector: selectSelectedId,
                            value: 'test-selectSelectedId'
                        },
                        {
                            selector: selectPlaylistsEntities,
                            value: [createPlaylistsEntity('test-selectEntity')]
                        },
                    ],
                    initialState
                }),
            ],
        });

        store = TestBed.inject(MockStore);
        facade = TestBed.inject(PlaylistsFacade);
        storeDispatchSpy = jest.spyOn(store, 'dispatch');
    });

    afterEach(() => {
        store?.resetSelectors();
    });

    it('selectors will receive the expected values', async () => {
        let isLoaded = await firstValueFrom(facade.loaded$);
        expect(isLoaded).toBe(false);

        let allPlaylists = await firstValueFrom(facade.allPlaylists$);
        expect(allPlaylists).toStrictEqual([createPlaylistsEntity('test-selectAllPlaylists').playlist]);

        let selectedPlaylists = await firstValueFrom(facade.selectedPlaylists$);
        expect(selectedPlaylists).toStrictEqual(createPlaylistsEntity('test-selectEntity').playlist);

        let selectedPlaylistsName = await firstValueFrom(facade.selectedPlaylistsName$);
        expect(selectedPlaylistsName).toStrictEqual(createPlaylistsEntity('test-selectSelectedId').playlist.name);

        let selectTracksFromPlaylistWithName = await firstValueFrom(facade.selectTracksFromPlaylistWithName('test-selectEntity'));
        // expect(selectTracksFromPlaylistWithName).toStrictEqual(createPlaylistsEntity('test-selectEntity').playlist.tracks);
    });

    it('init dispatches initPlaylists', async () => {
        facade.init();
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.initPlaylists())
    });

    it('selectPlaylist dispatches selectPlaylist with parameter value or empty string if no value is given', async () => {
        facade.selectPlaylist('test-selectPlaylist');
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.selectPlaylist({playlistName: 'test-selectPlaylist'}))

        facade.selectPlaylist(undefined);
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.selectPlaylist({playlistName: ''}))
    });

    it('addPlaylist dispatches addPlaylist with parameter value', async () => {
        facade.addPlaylist('test-addPlaylist');
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.addPlaylist({playlistName: 'test-addPlaylist'}))
    });

    it('addTrackToPlaylist dispatches addTrackToPlaylist with parameter value', async () => {
        const track = createPlaylistsEntity('addTrackToPlaylist').playlist.tracks[0];
        facade.addTrackToPlaylist(track);
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.addTrackToPlaylist({track}))
    });

    it('removeTrackFromPlaylist dispatches removeTrackFromPlaylist with parameter value', async () => {
        const track = createPlaylistsEntity('addTrackToPlaylist').playlist.tracks[0];
        facade.removeTrackFromPlaylist(track);
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.removeTrackFromPlaylist({track}))
    });

    it('importTracksFromPlaylist dispatches importTracksFromPlaylist with parameter value', async () => {
        const tracks = createPlaylistsEntity('addTrackToPlaylist').playlist.tracks;
        facade.importTracksFromPlaylist(tracks);
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.importTracksFromPlaylist({tracks}))
    });

    it('renamePlaylist dispatches renamePlaylist with parameter value', async () => {
        facade.renamePlaylist('test-renamePlaylist');
        expect(storeDispatchSpy).toHaveBeenCalledWith(PlaylistsActions.renamePlaylist({playlistName: 'test-renamePlaylist'}))
    });

});
