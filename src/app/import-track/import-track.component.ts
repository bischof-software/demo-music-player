import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {Track} from "../model/track";
import {TableModule} from "primeng/table";
import {PlaylistsFacade} from "../+state/playlists.facade";
import {take} from "rxjs";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {CardModule} from "primeng/card";
import {PlaylistDataComponent} from "../playlist-data/playlist-data.component";
import {PlaylistHeaderComponent} from "../playlist-header/playlist-header.component";
import {SkeletonModule} from "primeng/skeleton";
import {DurationPipe} from "../controller/duration.pipe";
import {LetDirective} from '@ngrx/component';
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-import-track',
    standalone: true,
    imports: [CommonModule, ButtonModule, TableModule, FormsModule, DropdownModule, CardModule, PlaylistDataComponent, PlaylistHeaderComponent, SkeletonModule, DurationPipe, LetDirective],
    templateUrl: './import-track.component.html',
    styleUrls: ['./import-track.component.scss'],
})
export class ImportTrackComponent implements OnInit {
    playlists: PlaylistsFacade = inject(PlaylistsFacade);
    dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);

    selectedPlaylist?: string = '';
    importPlaylist: string = '';
    selectedTracks: Track[] = [];

    playlistsOptions: string[] = [];

    importedPlaylist$ = this.playlists.selectTracksFromPlaylistWithName(this.importPlaylist);

    ngOnInit(): void {
        this.playlists.selectedPlaylistsName$.pipe(take(1)).subscribe(playlistName => this.selectedPlaylist = playlistName);
        this.playlists.allPlaylists$.pipe(take(1)).subscribe(playlists => {
            playlists.forEach(playlist => this.playlistsOptions.push(playlist.name))
            if (this.selectedPlaylist) {
                const index = this.playlistsOptions.indexOf(this.selectedPlaylist, 0);
                if (index > -1) {
                    this.playlistsOptions.splice(index, 1);
                }
            }
        });
    }

    importTracks = () => {
        this.playlists.importTracksFromPlaylist(this.selectedTracks);
        this.dynamicDialogRef.close();
    }

    selectedImport() {
        this.importedPlaylist$ = this.playlists.selectTracksFromPlaylistWithName(this.importPlaylist)
    }
}
