import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isNullOrUndefined} from "util";

@Injectable()
export class EditProfileService {
  S_experience: any;
  S_experienceEdit: any;
  S_editIndex = -1;
  S_practiceTypes: BehaviorSubject<any[]>;
  S_practiceRoles: BehaviorSubject<any[]>;
  S_practiceDSO: BehaviorSubject<any[]>;

  constructor() {
    if (isNullOrUndefined(this.S_experience)) {
      this.S_experience = {};
    }

    this.S_practiceTypes = new BehaviorSubject<any[]>([]);
    this.S_practiceRoles = new BehaviorSubject<any[]>([]);
    this.S_practiceDSO = new BehaviorSubject<any[]>([]);
  }

  selectPracticeType(p) {
    this.S_experience['practice_Type'] = p;
  }

  selectPracticeRole(r) {
    this.S_experience['practice_Role'] = r;
  }

  selectPracticeDSO(dso) {
    this.S_experience['practice_DSO'] = dso;
  }
}
