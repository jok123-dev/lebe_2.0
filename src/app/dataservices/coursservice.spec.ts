import { TestBed } from '@angular/core/testing';

import { Coursservice } from './coursservice';

describe('Coursservice', () => {
  let service: Coursservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Coursservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
