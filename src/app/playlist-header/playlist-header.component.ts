import {Component, inject, Input, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonModule} from "primeng/button";
import {SpeedDialModule} from "primeng/speeddial";
import {Playlist} from "../model/playlist";
import {Observable} from "rxjs";
import {MenuItem} from "primeng/api";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule} from "@angular/forms";
import {TooltipModule} from "primeng/tooltip";
import {PlaylistsFacade} from "../+state/playlists.facade";
import {DialogService} from "primeng/dynamicdialog";
import {NewTrackComponent} from "../new-track/new-track.component";
import {ImportTrackComponent} from "../import-track/import-track.component";

@Component({
    selector: 'app-playlist-header',
    standalone: true,
    imports: [CommonModule, ButtonModule, SpeedDialModule, InputTextModule, FormsModule, TooltipModule],
    providers: [DialogService],
    templateUrl: './playlist-header.component.html',
    styleUrls: ['./playlist-header.component.scss'],
})
export class PlaylistHeaderComponent implements OnInit {
    @Input()
    playlist$?: Observable<Playlist | undefined>;

    playlists: PlaylistsFacade = inject(PlaylistsFacade);
    dialogService: DialogService = inject(DialogService);

    items: MenuItem[] = [];
    editPlaylistName: boolean = false;
    newPlaylistName: string = '';

    ngOnInit(): void {
        this.items = [
            {
                icon: 'pi pi-pencil',
                command: () => this.editPlaylistName = !this.editPlaylistName,
                tooltipOptions: {
                    tooltipLabel: 'Playlist umbenennen'
                },
            },
            {
                icon: 'pi pi-plus',
                command: () => this.dialogService.open(NewTrackComponent, {
                    header: 'Neuer Track',
                    width: '70%',
                    contentStyle: { overflow: 'auto' },
                    baseZIndex: 10000,
                }),
                tooltipOptions: {
                    tooltipLabel: 'Track hinzufügen'
                },
            },
            {
                icon: 'pi pi-file-import',
                command: () => this.dialogService.open(ImportTrackComponent, {
                    header: 'Importiere Track',
                    width: '70%',
                    contentStyle: { overflow: 'auto' },
                    baseZIndex: 10000,
                }),
                tooltipOptions: {
                    tooltipLabel: 'Aus Playlist importieren'
                },
            },
        ]
    }

    changePlaylistName = () => {
        this.editPlaylistName = !this.editPlaylistName;
        this.playlists.renamePlaylist(this.newPlaylistName);
    }
}
