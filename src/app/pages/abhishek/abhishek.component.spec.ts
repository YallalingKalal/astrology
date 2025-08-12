import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbhishekComponent } from './abhishek.component';

describe('AbhishekComponent', () => {
  let component: AbhishekComponent;
  let fixture: ComponentFixture<AbhishekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbhishekComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbhishekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
