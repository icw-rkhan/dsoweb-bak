import { TestBed } from '@angular/core/testing';

import { ResidencyService } from './residency.service';

describe('ResidencyService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResidencyService = TestBed.get(ResidencyService);
    expect(service).toBeTruthy();
  });
});
