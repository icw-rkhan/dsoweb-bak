import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeDSOComponent } from './practice-dso.component';

describe('PracticeDSOComponent', () => {
  let component: PracticeDSOComponent;
  let fixture: ComponentFixture<PracticeDSOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeDSOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeDSOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
