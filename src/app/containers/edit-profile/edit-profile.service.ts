import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {isNullOrUndefined} from "util";

@Injectable()
export class EditProfileService {
  S_experiences: any;
  S_practiceTypes: BehaviorSubject<any[]>;
  S_practiceRoles: BehaviorSubject<any[]>;
  S_practiceDSO: BehaviorSubject<any[]>;

  constructor() {
    if (isNullOrUndefined(this.S_experiences) || this.S_experiences.length === 0) {
      this.S_experiences = [];
      this.S_experiences.push({});
    }

    this.S_practiceTypes = new BehaviorSubject<any[]>([]);
    this.S_practiceRoles = new BehaviorSubject<any[]>([]);
    this.S_practiceDSO = new BehaviorSubject<any[]>([]);
  }

  selectPracticeType(p) {
    this.S_experiences[0]['practice_Type'] = p;
  }

  selectPracticeRole(r) {
    this.S_experiences[0]['practice_Role'] = r;
  }

  selectPracticeDSO(dso) {
    this.S_experiences[0]['practice_DSO'] = dso;
  }
}
