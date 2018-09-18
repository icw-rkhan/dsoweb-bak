import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidencySearchComponent } from './residency-search.component';

describe('ResidencySearchComponent', () => {
  let component: ResidencySearchComponent;
  let fixture: ComponentFixture<ResidencySearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResidencySearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResidencySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
