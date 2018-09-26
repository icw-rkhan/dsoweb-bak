import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeAddressComponent } from './practice-address.component';

describe('PracticeAddressComponent', () => {
  let component: PracticeAddressComponent;
  let fixture: ComponentFixture<PracticeAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
