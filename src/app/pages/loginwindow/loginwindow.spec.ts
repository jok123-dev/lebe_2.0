import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginwindow } from './loginwindow';

describe('Loginwindow', () => {
  let component: Loginwindow;
  let fixture: ComponentFixture<Loginwindow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginwindow],
    }).compileComponents();

    fixture = TestBed.createComponent(Loginwindow);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
