import { TestBed } from '@angular/core/testing';

import { CompanyreviewService } from './companyreview.service';

describe('CompanyreviewService', () => {
  let service: CompanyreviewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyreviewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
