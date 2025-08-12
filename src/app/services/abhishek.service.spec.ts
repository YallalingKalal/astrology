import { TestBed } from '@angular/core/testing';

import { AbhishekService } from './abhishek.service';

describe('AbhishekService', () => {
  let service: AbhishekService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AbhishekService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
