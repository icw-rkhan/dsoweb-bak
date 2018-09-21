import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeRoleComponent } from './practice-role.component';

describe('PracticeRoleComponent', () => {
  let component: PracticeRoleComponent;
  let fixture: ComponentFixture<PracticeRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
