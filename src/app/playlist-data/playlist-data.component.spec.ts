import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaylistDataComponent} from './playlist-data.component';

describe('PlaylistDataComponent', () => {
    let component: PlaylistDataComponent;
    let fixture: ComponentFixture<PlaylistDataComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [PlaylistDataComponent]
        });
        fixture = TestBed.createComponent(PlaylistDataComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
