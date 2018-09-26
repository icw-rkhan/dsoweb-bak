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
  @Output() delete: EventEmitter<null> = new EventEmitter(null);
  @Output() selectEducation: EventEmitter<null> = new EventEmitter(null);
  @Output() saveEducation: EventEmitter<Education> = new EventEmitter(null);
  // @Output() deleteEducation: EventEmitter<null> = new EventEmitter(null);

  type: number;
  school_name: string;
  dental_school: string;
  year: number;
  isErrorName: boolean;
  isErrorYear: boolean;
  isDelete: boolean;

  constructor() {
    this.isErrorName = this.isErrorYear = false;
  }

  ngOnInit() {
    this.school_name = '';
    this.isDelete = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.type = (this.typeEducation == 1) ? 0: 1;//typeEducation: 1 edit, 2 add, type: 0 US, 1 non US
    if (changes.education) {
      this.type = 0;
      if (this.typeEducation == 1) {//edit
        if (changes.education.currentValue && changes.education.currentValue.year != null) {
          this.year = changes.education.currentValue.year;
        }
          
        if (changes.education.currentValue) {
          if (changes.education.currentValue.types) {
            this.type = changes.education.currentValue.types;
          }
          this.school_name = changes.education.currentValue.id ? '' : changes.education.currentValue.name;
        }
      }
    }
  }

  _save() {
    if (this.type == 0) {
      this.school_name = this.education.name;
    }
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
    
    const dt = {
      id: this.education ? this.education.id : null,
      name: this.school_name,
      year: this.year,
      types: this.type
    };
    this.school_name = '';
    this.year = null;
    this.saveEducation.emit(new Education().deserialize(dt));
  }

  _cancel() {
    this._onRefresh();
    this.delete.emit();
  }

  onDelete() {
    if (this.typeEducation === 1) {
      this.isDelete = true;
    } else {
      this._onRefresh();
      this.delete.emit();
    }
  }

  _deleteEducation() {
    this._onRefresh();
    this.delete.emit();
  }

  _onRefresh() {
    this.school_name = '';
    this.year = null;
    this.type = 1;
    this.isDelete = false;
  }

  _selectEducation() {
    this.selectEducation.emit();
  }

  keyDown(e) {
    if (!(parseInt(e.key) <= 9 && parseInt(e.key) >= 0) &&
     e.keyCode != 8 || (e.target.value.length > 3 && e.keyCode != 8)) {
      e.preventDefault();
      return;
    }
  }

}
