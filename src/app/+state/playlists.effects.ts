import {inject, Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, withLatestFrom} from 'rxjs';
import * as PlaylistsActions from './playlists.actions';
import {PlaylistService} from "../controller/playlist.service";
import {PlaylistsEntity} from "./playlists.models";
import {Store} from "@ngrx/store";
import {selectAllPlaylists, selectEntity, selectPlaylistsLoaded} from "./playlists.selectors";

@Injectable()
export class PlaylistsEffects {
    private actions$ = inject(Actions);
    private store = inject(Store);
    private playlistService = inject(PlaylistService);

    init$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsActions.initPlaylists),
            withLatestFrom(this.store.select(selectPlaylistsLoaded), this.store.select(selectAllPlaylists)),
            switchMap(([, loaded, loadedPlaylistsEntities,]) => this.playlistService.getAllPlaylists().pipe(
                    map(playlists => {
                            let playlistEntities: PlaylistsEntity[] = [];
                            playlists.forEach(playlist => playlistEntities.push({
                                id: playlist.name,
                                playlist: playlist
                            }))
                            playlistEntities = loaded ? loadedPlaylistsEntities : playlistEntities;
                            console.log(loaded ? loadedPlaylistsEntities : playlistEntities);
                            return PlaylistsActions.loadPlaylistsSuccess({playlists: playlistEntities})
                        }
                    )
                )
            ),
            catchError((error) => {
                console.error('Error', error);
                return of(PlaylistsActions.loadPlaylistsFailure({error}));
            })
        )
    );

    renamePlaylist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsActions.renamePlaylist),
            concatLatestFrom(() => this.store.select(selectEntity)),
            map(([action, playlistEntity]) => {
                    if (playlistEntity) {
                        return PlaylistsActions.renamedPlaylist({
                            playlist: {
                                id: action.playlistName,
                                playlist: {
                                    name: action.playlistName,
                                    tracks: playlistEntity.playlist.tracks
                                }
                            },
                            oldPlaylistName: playlistEntity.id
                        })
                    } else {
                        return PlaylistsActions.renamedPlaylistFailure()
                    }
                }
            )
        )
    );

    renamedPlaylist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsActions.renamedPlaylist),
            map((action) => PlaylistsActions.removePlaylist({playlistName: action.oldPlaylistName}))
        )
    );

    removeTrackFromPlaylist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsActions.removeTrackFromPlaylist),
            concatLatestFrom(() => this.store.select(selectEntity)),
            map(([action, playlistEntity]) => {
                if (playlistEntity) {
                    const tracks = [...playlistEntity.playlist.tracks];
                    const index = tracks.indexOf(action.track, 0);
                    if (index > -1) {
                        tracks?.splice(index, 1);
                    }
                    return PlaylistsActions.updatedPlaylist({playlist: {id: playlistEntity.id, playlist: {name: playlistEntity.playlist.name, tracks}}});
                } else {
                    return PlaylistsActions.updatedPlaylistFailure();
                }

            })
        )
    );

    addTrackToPlaylist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsActions.addTrackToPlaylist),
            concatLatestFrom(() => this.store.select(selectEntity)),
            map(([action, playlistEntity]) => {
                if (playlistEntity) {
                    const tracks = [...playlistEntity.playlist.tracks, action.track];
                    return PlaylistsActions.updatedPlaylist({playlist: {id: playlistEntity.id, playlist: {name: playlistEntity.playlist.name, tracks}}});
                } else {
                    return PlaylistsActions.updatedPlaylistFailure();
                }

            })
        )
    );

    importTracksFromPlaylist$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PlaylistsActions.importTracksFromPlaylist),
            concatLatestFrom(() => this.store.select(selectEntity)),
            map(([action, playlistEntity]) => {
                if (playlistEntity) {
                    const tracks = [...playlistEntity.playlist.tracks, ...action.tracks];
                    return PlaylistsActions.updatedPlaylist({playlist: {id: playlistEntity.id, playlist: {name: playlistEntity.playlist.name, tracks: tracks}}});
                } else {
                    return PlaylistsActions.updatedPlaylistFailure();
                }

            })
        )
    );
}
