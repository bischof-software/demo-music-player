import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewTrackComponent } from './new-track.component';

describe('NewTrackComponent', () => {
  let component: NewTrackComponent;
  let fixture: ComponentFixture<NewTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewTrackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NewTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
