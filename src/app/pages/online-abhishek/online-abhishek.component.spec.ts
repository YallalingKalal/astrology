import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineAbhishekComponent } from './online-abhishek.component';

describe('OnlineAbhishekComponent', () => {
  let component: OnlineAbhishekComponent;
  let fixture: ComponentFixture<OnlineAbhishekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnlineAbhishekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnlineAbhishekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
