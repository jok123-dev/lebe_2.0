import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lwldialog } from './lwldialog';

describe('Lwldialog', () => {
  let component: Lwldialog;
  let fixture: ComponentFixture<Lwldialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lwldialog],
    }).compileComponents();

    fixture = TestBed.createComponent(Lwldialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
