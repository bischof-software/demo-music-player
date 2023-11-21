import {NgModule} from '@angular/core';
import {TestBed} from '@angular/core/testing';
import {EffectsModule} from '@ngrx/effects';
import {Store, StoreModule} from '@ngrx/store';
import {readFirst} from '@nx/angular/testing';

import * as PlaylistsActions from './playlists.actions';
import {PlaylistsEffects} from './playlists.effects';
import {PlaylistsFacade} from './playlists.facade';
import {PlaylistsEntity} from './playlists.models';
import {PLAYLISTS_FEATURE_KEY, playlistsReducer, PlaylistsState,} from './playlists.reducer';

interface TestSchema {
    playlists: PlaylistsState;
}

describe('PlaylistsFacade', () => {
    let facade: PlaylistsFacade;
    let store: Store<TestSchema>;
    const createPlaylistsEntity = (id: string, name = ''): PlaylistsEntity => ({
        id,
        name: name || `name-${id}`,
    });

    describe('used in NgModule', () => {
        beforeEach(() => {
            @NgModule({
                imports: [
                    StoreModule.forFeature(PLAYLISTS_FEATURE_KEY, playlistsReducer),
                    EffectsModule.forFeature([PlaylistsEffects]),
                ],
                providers: [PlaylistsFacade],
            })
            class CustomFeatureModule {
            }

            @NgModule({
                imports: [
                    StoreModule.forRoot({}),
                    EffectsModule.forRoot([]),
                    CustomFeatureModule,
                ],
            })
            class RootModule {
            }

            TestBed.configureTestingModule({imports: [RootModule]});

            store = TestBed.inject(Store);
            facade = TestBed.inject(PlaylistsFacade);
        });

        /**
         * The initially generated facade::loadAll() returns empty array
         */
        it('loadAll() should return empty list with loaded == true', async () => {
            let list = await readFirst(facade.allPlaylists$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            facade.init();

            list = await readFirst(facade.allPlaylists$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(true);
        });

        /**
         * Use `loadPlaylistsSuccess` to manually update list
         */
        it('allPlaylists$ should return the loaded list; and loaded flag == true', async () => {
            let list = await readFirst(facade.allPlaylists$);
            let isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(0);
            expect(isLoaded).toBe(false);

            store.dispatch(
                PlaylistsActions.loadPlaylistsSuccess({
                    playlists: [
                        createPlaylistsEntity('AAA'),
                        createPlaylistsEntity('BBB'),
                    ],
                })
            );

            list = await readFirst(facade.allPlaylists$);
            isLoaded = await readFirst(facade.loaded$);

            expect(list.length).toBe(2);
            expect(isLoaded).toBe(true);
        });
    });
});
