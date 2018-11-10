import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteSearchComponent } from './unite-search.component';

describe('UniteSearchComponent', () => {
  let component: UniteSearchComponent;
  let fixture: ComponentFixture<UniteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniteSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
