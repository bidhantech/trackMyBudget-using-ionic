import { TestBed } from '@angular/core/testing';

import { StoreRateService } from './store-rate.service';

describe('StoreRateService', () => {
  let service: StoreRateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreRateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
