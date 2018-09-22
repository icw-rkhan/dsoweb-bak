import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Education } from '../../../models/education.model';

@Component({
  selector: 'dso-education-search',
  templateUrl: './education-search.component.html',
  styleUrls: ['./education-search.component.scss']
})
export class EducationSearchComponent implements OnInit {
  @Input('listSchool') listSchool: any[];
  @Input('education') education: Education;
  @Output() selectedEducation: EventEmitter<Education> = new EventEmitter(null);
  @Output() backSearchEducation: EventEmitter<null> = new EventEmitter(null);
  listSchoolS: any[];

  constructor() {
  }

  ngOnInit() {
    this.listSchoolS = this.listSchool;
  }

  selected(s: any) {
    if (this.education && this.education.year) {
      s.year = this.education.year;
    }
    const e = new Education().deserialize(s);
    this.selectedEducation.emit(e);
  }

  search(e) {
    this.listSchoolS = this.listSchool.filter((es: Education) => es.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
  }

  _backSearchEducation() {
    this.backSearchEducation.emit();
  }

}
