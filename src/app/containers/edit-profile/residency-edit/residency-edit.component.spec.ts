import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencyEditComponent } from './residency-edit.component';

describe('ResidencyEditComponent', () => {
  let component: ResidencyEditComponent;
  let fixture: ComponentFixture<ResidencyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidencyEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
