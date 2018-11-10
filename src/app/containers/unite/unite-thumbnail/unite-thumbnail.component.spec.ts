import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UniteThumbnailComponent } from './unite-thumbnail.component';

describe('UniteThumbnailComponent', () => {
  let component: UniteThumbnailComponent;
  let fixture: ComponentFixture<UniteThumbnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UniteThumbnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UniteThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
