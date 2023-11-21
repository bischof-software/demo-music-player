import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImportTrackComponent } from './import-track.component';

describe('ImportTrackComponent', () => {
  let component: ImportTrackComponent;
  let fixture: ComponentFixture<ImportTrackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportTrackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportTrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
