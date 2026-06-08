import { TestBed } from '@angular/core/testing';

import { Copetencegriddataservice } from './copetencegriddataservice';

describe('Copetencegriddataservice', () => {
  let service: Copetencegriddataservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Copetencegriddataservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
