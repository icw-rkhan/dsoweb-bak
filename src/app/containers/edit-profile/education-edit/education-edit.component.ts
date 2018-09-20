import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'dso-education-edit',
  templateUrl: './education-edit.component.html',
  styleUrls: ['./education-edit.component.scss']
})
export class EducationEditComponent implements OnInit, OnChanges {
  @Input('typeEducation') typeEducation: number;
  @Input('education') education: Education;
  @Output() cancel: EventEmitter<null> = new EventEmitter(null);
  @Output() selectEducation: EventEmitter<null> = new EventEmitter(null);
  type: boolean;
  school_name: string;
  dental_school: string;
  year: number;
  isErrorName: boolean;
  isErrorYear: boolean;

  constructor() {
    this.isErrorName = this.isErrorYear = false;
  }

  ngOnInit() {
    this.school_name = '';
    this.year = null;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.type = (this.typeEducation == 1);
  }

  _save() {
    console.log(this.year);
    console.log(this.school_name);
    this.isErrorName = this.isErrorYear = false;
    if (this.school_name.length < 1) {
      this.isErrorName = true;
    }
    if (this.year < 1950 || this.year > new Date().getFullYear()) {
      this.isErrorYear = true;
    }
    if (this.isErrorName || this.isErrorYear) {
      return;
    }
  }

  _cancel() {
    this.cancel.emit();
  }

  _selectEducation() {
    this.selectEducation.emit();
  }

  keyDown(e) {
    if (!(parseInt(e.key) <= 9 && parseInt(e.key) >=0) && e.keyCode !=8 || (e.target.value.length > 3 && e.keyCode != 8)) {
      e.preventDefault();
      return;
    }
    console.log(e);
    console.log(e.target.value);
  }

}
