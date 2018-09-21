import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeTypeComponent } from './practice-type.component';

describe('PracticeTypeComponent', () => {
  let component: PracticeTypeComponent;
  let fixture: ComponentFixture<PracticeTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
