import { TestBed } from '@angular/core/testing';

import { CasherService } from './casher.service';

describe('CasherService', () => {
  let service: CasherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
