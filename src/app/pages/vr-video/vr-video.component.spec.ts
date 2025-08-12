import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VRVideoComponent } from './vr-video.component';

describe('VRVideoComponent', () => {
  let component: VRVideoComponent;
  let fixture: ComponentFixture<VRVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VRVideoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VRVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
