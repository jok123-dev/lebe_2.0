import { TestBed } from '@angular/core/testing';

import { Userdataservice } from './userdataservice';

describe('Userdataservice', () => {
  let service: Userdataservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userdataservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
