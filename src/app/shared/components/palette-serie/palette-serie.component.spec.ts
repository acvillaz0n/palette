import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaletteSerieComponent } from './palette-serie.component';

describe('PaletteSerieComponent', () => {
  let component: PaletteSerieComponent;
  let fixture: ComponentFixture<PaletteSerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaletteSerieComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaletteSerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
