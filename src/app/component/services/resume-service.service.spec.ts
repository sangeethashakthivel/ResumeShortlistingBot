import { TestBed } from '@angular/core/testing';

import { ResumeServiceService } from './resume-service.service';

describe('ResumeServiceService', () => {
  let service: ResumeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResumeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
