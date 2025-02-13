import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgPickColorComponent } from './img-pick-color.component';

describe('ImgPickColorComponent', () => {
  let component: ImgPickColorComponent;
  let fixture: ComponentFixture<ImgPickColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImgPickColorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImgPickColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
