import { TestBed } from '@angular/core/testing';

import { CentralImageService } from './central-image.service';

describe('CentralImageService', () => {
  let service: CentralImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CentralImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
