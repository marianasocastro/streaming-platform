import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudioCarouselComponent } from './studio-carousel.component';

describe('StudioCarouselComponent', () => {
  let component: StudioCarouselComponent;
  let fixture: ComponentFixture<StudioCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudioCarouselComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudioCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
