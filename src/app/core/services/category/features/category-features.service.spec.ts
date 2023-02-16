import { TestBed } from '@angular/core/testing';

import { CategoryFeaturesService } from './category-features.service';

describe('CategoryFeaturesService', () => {
  let service: CategoryFeaturesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryFeaturesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
