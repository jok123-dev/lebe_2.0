import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Selectcompetencegrid } from './selectcompetencegrid';

describe('Selectcompetencegrid', () => {
  let component: Selectcompetencegrid;
  let fixture: ComponentFixture<Selectcompetencegrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selectcompetencegrid],
    }).compileComponents();

    fixture = TestBed.createComponent(Selectcompetencegrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
