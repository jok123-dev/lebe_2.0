import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Dokumentetab } from './dokumentetab';

describe('Dokumentetab', () => {
  let component: Dokumentetab;
  let fixture: ComponentFixture<Dokumentetab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Dokumentetab],
    }).compileComponents();

    fixture = TestBed.createComponent(Dokumentetab);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
