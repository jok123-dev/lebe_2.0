import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Competencegrid } from './competencegrid';

describe('Competencegrid', () => {
  let component: Competencegrid;
  let fixture: ComponentFixture<Competencegrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Competencegrid],
    }).compileComponents();

    fixture = TestBed.createComponent(Competencegrid);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
