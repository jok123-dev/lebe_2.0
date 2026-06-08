import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Statustab } from './statustab';

describe('Statustab', () => {
  let component: Statustab;
  let fixture: ComponentFixture<Statustab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Statustab],
    }).compileComponents();

    fixture = TestBed.createComponent(Statustab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
