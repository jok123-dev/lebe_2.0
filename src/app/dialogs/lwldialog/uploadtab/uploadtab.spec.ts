import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Uploadtab } from './uploadtab';

describe('Uploadtab', () => {
  let component: Uploadtab;
  let fixture: ComponentFixture<Uploadtab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Uploadtab],
    }).compileComponents();

    fixture = TestBed.createComponent(Uploadtab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
