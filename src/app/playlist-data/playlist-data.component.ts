import {Component, inject, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DataViewModule} from "primeng/dataview";
import {Playlist} from "../model/playlist";
import {ButtonModule} from "primeng/button";
import {DurationPipe} from "../controller/duration.pipe";
import {Observable} from "rxjs";
import {Track} from "../model/track";
import {SpeedDialModule} from "primeng/speeddial";
import {PlaylistsFacade} from "../+state/playlists.facade";

@Component({
    selector: 'app-playlist-data',
    standalone: true,
    imports: [CommonModule, DataViewModule, ButtonModule, DurationPipe, SpeedDialModule],
    templateUrl: './playlist-data.component.html',
    styleUrls: ['./playlist-data.component.scss']
})
export class PlaylistDataComponent {
    @Input()
    playlist$?: Observable<Playlist | undefined>;

    playlists: PlaylistsFacade = inject(PlaylistsFacade);

    removeTrack = (track: Track): void => this.playlists.removeTrackFromPlaylist(track);
}
