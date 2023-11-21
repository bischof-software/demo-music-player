import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HeaderComponent} from "./header/header.component";
import {PlaylistsFacade} from "./+state/playlists.facade";

@Component({
    standalone: true,
    imports: [RouterModule, HeaderComponent],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'music-player';

    constructor(playlists: PlaylistsFacade) {
        playlists.init();
    }
}
