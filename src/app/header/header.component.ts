import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardModule} from "primeng/card";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {PlaylistsFacade} from "../+state/playlists.facade";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, CardModule, DropdownModule, FormsModule, ButtonModule, InputTextModule, DialogModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    playlists: PlaylistsFacade = inject(PlaylistsFacade);

    playlistsOptions: string[] = [];
    selectedPlaylist?: string;
    addNewPlaylist = false;
    newPlaylistName = '';

    ngOnInit() {
        this.playlists.allPlaylists$.subscribe(playlists => {
            const newOptions: string[] = [];
            playlists.forEach(playlist => newOptions.push(playlist.name))
            this.playlistsOptions = [...new Set(newOptions)]
        });
        this.playlists.selectedPlaylistsName$.subscribe(playlistName => this.selectedPlaylist = playlistName);
    }

    selectPlaylist = () => this.playlists.selectPlaylist(this.selectedPlaylist);

    newPlaylist = () => this.addNewPlaylist = true;
    newPlaylistAdded = () => {
        this.addNewPlaylist = false;
        this.playlists.addPlaylist(this.newPlaylistName)
    };
}