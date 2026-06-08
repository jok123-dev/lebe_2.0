import { TestBed } from '@angular/core/testing';

import { Userlwlstatus } from './userlwlstatus';

describe('Userlwlstatus', () => {
  let service: Userlwlstatus;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Userlwlstatus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
