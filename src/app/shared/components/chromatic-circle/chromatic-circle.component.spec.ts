import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChromaticCircleComponent } from './chromatic-circle.component';

describe('ChromaticCircleComponent', () => {
  let component: ChromaticCircleComponent;
  let fixture: ComponentFixture<ChromaticCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChromaticCircleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChromaticCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
