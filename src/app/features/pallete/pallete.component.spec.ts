import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PalleteComponent } from './pallete.component';

describe('PalleteComponent', () => {
  let component: PalleteComponent;
  let fixture: ComponentFixture<PalleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PalleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PalleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
