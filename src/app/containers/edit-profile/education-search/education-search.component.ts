import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ProfileService } from '../../../services/profile.service';

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

  mode: number;
  listSchoolS: any[];

  constructor(private profileService: ProfileService) {
    this.mode = 0;
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
    const text = e.target.value.toLocaleLowerCase();

    this.listSchoolS = this.listSchool.filter((es: Education) => {
      if (es.alias) {
        return es.name.toLocaleLowerCase().includes(text) ||
        es.alias.toLocaleLowerCase().includes(text);
      }

      return es.name.toLocaleLowerCase().includes(text);
    });

    if (this.mode) {
      const subProfile = this.profileService.dentalSchoolByAlias(text).subscribe(p => {
        this.listSchoolS = p;

        subProfile.unsubscribe();
      });
    }
  }

  _backSearchEducation() {
    this.backSearchEducation.emit();
  }

}
