import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'dso-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss']
})
export class EducationEditComponent implements OnInit {
  @Input('typeEducation') typeEducation: number;
  @Input('education') education: Education;
  @Output() cancel: EventEmitter<null> = new EventEmitter(null);
  @Output() selectEducation: EventEmitter<null> = new EventEmitter(null);

  constructor() { }

  ngOnInit() {
  }

  _cancel() {
    this.cancel.emit();
  }

  _selectEducation() {
    this.selectEducation.emit();
  }

}
