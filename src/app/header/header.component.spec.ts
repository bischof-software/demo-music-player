import {ComponentFixture, TestBed} from '@angular/core/testing';
import {HeaderComponent} from './header.component';
import {MockInstance, MockModule, MockProvider, MockRender} from "ng-mocks";
import {CardModule} from "primeng/card";
import {CommonModule} from "@angular/common";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {PlaylistsFacade} from "../+state/playlists.facade";
import {EMPTY, of} from "rxjs";
import {Playlist} from "../model/playlist";

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;

    const playlist: Playlist = {
        name: 'test-playlist',
        tracks: []
    }
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent,
                MockModule(CommonModule),
                MockModule(CardModule),
                MockModule(DropdownModule),
                MockModule(FormsModule),
                MockModule(ButtonModule),
                MockModule(InputTextModule),
                MockModule(DialogModule),
            ],
            providers: [MockProvider(PlaylistsFacade, {
                allPlaylists$: of([playlist]),
                selectedPlaylistsName$: of('test-playlist-selected'),
            })]
        }).compileComponents();
        fixture = MockRender(HeaderComponent);
        component = fixture.componentInstance;
    });

    it('creates component and will add options and set selected playlist name', () => {
        expect(component).toBeTruthy();
        expect(component.playlistsOptions).toStrictEqual(['test-playlist'])
        expect(component.selectedPlaylist).toStrictEqual('test-playlist-selected')
    });

    it('will pass the selected parameter to the facade', () => {
        const facade = TestBed.inject(PlaylistsFacade);
        const facadeSpy = MockInstance(
            PlaylistsFacade,
            'selectPlaylist',
            jest.fn(),
        );

        component.selectPlaylist();

        expect(facadeSpy).toHaveBeenCalledWith('test-playlist-selected')
    });

    it('will change the new playlist flag to true', () => {
        expect(component.addNewPlaylist).toBeFalsy();
        component.newPlaylist();
        expect(component.addNewPlaylist).toBeTruthy();
    });

    it('will add a ne playlist by changing the new playlist flag to false and call the facade', () => {
        const facadeSpy = MockInstance(
            PlaylistsFacade,
            'addPlaylist',
            jest.fn(),
        );
        component.newPlaylistName = 'new playlist';

        component.newPlaylistAdded();

        expect(component.addNewPlaylist).toBeFalsy();
        expect(facadeSpy).toHaveBeenCalledWith('new playlist')
    });
});
