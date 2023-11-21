import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlaylistsFacade} from "../+state/playlists.facade";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {SliderModule} from "primeng/slider";
import {DurationPipe} from "../controller/duration.pipe";
import {InputTextModule} from "primeng/inputtext";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
    selector: 'app-new-track',
    standalone: true,
    imports: [CommonModule, ButtonModule, FormsModule, SliderModule, InputTextModule, DurationPipe],
    templateUrl: './new-track.component.html',
    styleUrls: ['./new-track.component.scss'],
})
export class NewTrackComponent {
    playlists: PlaylistsFacade = inject(PlaylistsFacade);
    dynamicDialogRef: DynamicDialogRef = inject(DynamicDialogRef);

    title: string = '';
    artist: string = '';
    duration: number = 0;
    album: string = '';

    addNewTrack = () => {
        this.playlists.addTrackToPlaylist({title: this.title, album: this.album, artist: this.artist, duration: this.duration});
        this.dynamicDialogRef.close();
    };
}
