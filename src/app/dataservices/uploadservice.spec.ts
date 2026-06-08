import { TestBed } from '@angular/core/testing';

import { Uploadservice } from './uploadservice';

describe('Uploadservice', () => {
  let service: Uploadservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Uploadservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
