import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KundaliComponent } from './kundali.component';

describe('KundaliComponent', () => {
  let component: KundaliComponent;
  let fixture: ComponentFixture<KundaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KundaliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KundaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
