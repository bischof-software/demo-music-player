import {Injectable} from '@angular/core';
import {Playlist} from '../model/playlist';
import {Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PlaylistService {
    constructor() {
    }

    getAllPlaylists(): Observable<Playlist[]> {
        return of([
            {
                name: 'Coding Mixtape',
                tracks: [
                    {
                        title: 'The Negative One',
                        artist: 'Slipknot',
                        duration: 325,
                        album: '.5: The Gray Chapter'
                    },
                    {
                        title: 'Headstrong',
                        artist: 'Trapt',
                        duration: 285,
                        album: 'Trapt'
                    },
                    {
                        title: 'Kids',
                        artist: 'Hämatom',
                        duration: 204,
                        album: 'X'
                    },
                ]
            },
            {
                name: 'Sport Mixtape',
                tracks: [
                    {
                        title: 'Under The Knife',
                        artist: 'Rise Against',
                        duration: 165,
                        album: 'The Suffer & The Witness'
                    },
                    {
                        title: 'Breaking the Habbit',
                        artist: 'Linkin Park',
                        duration: 196,
                        album: 'Meteora'
                    },
                    {
                        title: 'Throne',
                        artist: 'Bring Me The Horizon',
                        duration: 191,
                        album: 'Thats The Spirit'
                    },
                ]
            },
            {
                name: 'Party Mixtape',
                tracks: [
                    {
                        title: 'Kino?!',
                        artist: 'Montreal',
                        duration: 159,
                        album: 'Schackilacki'
                    },
                    {
                        title: 'Dancehall Caballeros',
                        artist: 'Seeed',
                        duration: 192,
                        album: 'New Chubby Conquerors'
                    },
                    {
                        title: 'Ich will nicht nach Berlin',
                        artist: 'Kraftklub',
                        duration: 202,
                        album: 'Mit K'
                    },
                ]
            }
        ]);
    }

}
