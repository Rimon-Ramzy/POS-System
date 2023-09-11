import { TestBed } from '@angular/core/testing';

import { CashersDataService } from './cashers-data.service';

describe('CashersDataService', () => {
  let service: CashersDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CashersDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
