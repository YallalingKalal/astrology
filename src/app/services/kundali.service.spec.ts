import { TestBed } from '@angular/core/testing';

import { KundaliService } from './kundali.service';

describe('KundaliService', () => {
  let service: KundaliService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KundaliService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
