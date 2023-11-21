import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from "primeng/card";
import {PlaylistsFacade} from "../+state/playlists.facade";
import {PlaylistHeaderComponent} from "../playlist-header/playlist-header.component";
import {PlaylistDataComponent} from "../playlist-data/playlist-data.component";
import {SkeletonModule} from "primeng/skeleton";

@Component({
    selector: 'app-playlist',
    standalone: true,
    imports: [CommonModule, PlaylistHeaderComponent, PlaylistDataComponent, CardModule, SkeletonModule],
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent {
    playlists: PlaylistsFacade = inject(PlaylistsFacade);
    playlist$ = this.playlists.selectedPlaylists$;
}
