import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteShareComponent } from './unite-share.component';

describe('UniteShareComponent', () => {
  let component: UniteShareComponent;
  let fixture: ComponentFixture<UniteShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniteShareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
