import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenrerBannerComponent } from './genrer-banner.component';

describe('GenrerBannerComponent', () => {
  let component: GenrerBannerComponent;
  let fixture: ComponentFixture<GenrerBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenrerBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenrerBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
