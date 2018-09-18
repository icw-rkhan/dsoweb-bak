import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencyAddComponent } from './residency-add.component';

describe('ResidencyAddComponent', () => {
  let component: ResidencyAddComponent;
  let fixture: ComponentFixture<ResidencyAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidencyAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
