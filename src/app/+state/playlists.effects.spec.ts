import {TestBed} from '@angular/core/testing';
import {provideMockActions} from '@ngrx/effects/testing';
import {Action} from '@ngrx/store';
import {provideMockStore} from '@ngrx/store/testing';
import {hot} from 'jasmine-marbles';
import {Observable} from 'rxjs';

import * as PlaylistsActions from './playlists.actions';
import {PlaylistsEffects} from './playlists.effects';

describe('PlaylistsEffects', () => {
    let actions: Observable<Action>;
    let effects: PlaylistsEffects;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [],
            providers: [
                PlaylistsEffects,
                provideMockActions(() => actions),
                provideMockStore(),
            ],
        });

        effects = TestBed.inject(PlaylistsEffects);
    });

    describe('init$', () => {
        it('should work', () => {
            actions = hot('-a-|', {a: PlaylistsActions.initPlaylists()});

            const expected = hot('-a-|', {
                a: PlaylistsActions.loadPlaylistsSuccess({playlists: []}),
            });

            expect(effects.init$).toBeObservable(expected);
        });
    });
});
