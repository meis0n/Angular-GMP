import { TestBed } from '@angular/core/testing';

import { CoursesStoreService } from './courses-store.service';

describe('CoursesStoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoursesStoreService = TestBed.get(CoursesStoreService);
    expect(service).toBeTruthy();
  });
});
