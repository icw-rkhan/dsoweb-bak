import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditProfileService} from '../edit-profile.service';
import {MAT_DATE_FORMATS, MatDatepicker} from '@angular/material';
import {AlertService} from '../../../services/alert.service';
import {isNullOrUndefined} from 'util';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss'],
  providers: [{provide: MAT_DATE_FORMATS, useValue: MY_FORMATS}]
})
export class EditExperienceComponent implements OnInit {
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() addExperience: EventEmitter<any> = new EventEmitter(null);
  @Output() editExperience: EventEmitter<any> = new EventEmitter(null);

  isCurrentWork: boolean;

  title = '';

  startDate: Date;
  endDate: Date;

  constructor(public experienceService: EditProfileService,
              public alertService: AlertService) {
    if (isNullOrUndefined(this.experienceService.S_experienceEdit)) {
      this.title = 'Add Experience';
      this.experienceService.S_experience = {};
    } else {
      this.title = 'Edit Experience';
      this.experienceService.S_experience = this.experienceService.S_experienceEdit;
      this.startDate = this.experienceService.S_experienceEdit.start_time;
      this.endDate = this.experienceService.S_experienceEdit.end_time;
    }
    this.isCurrentWork = false;

    console.log('init ex', this.experienceService.S_experience);
  }

  ngOnInit() {
    if (isNullOrUndefined(this.experienceService.S_experienceEdit)) {
      this.title = 'Add Experience';
      this.experienceService.S_experience = {};
    } else {
      this.title = 'Edit Experience';
      this.experienceService.S_experience = this.experienceService.S_experienceEdit;
    }
    this.isCurrentWork = false;

    console.log('init ex', this.experienceService.S_experience);
  }

  chosenStartDate(date: Date, datepicker: MatDatepicker<Date>) {
    this.startDate = new Date(date.getFullYear(), date.getMonth());
    datepicker.close();
  }

  chosenEndDate(date: Date, datepicker: MatDatepicker<Date>) {
    this.endDate = new Date(date.getFullYear(), date.getMonth());
    datepicker.close();
  }

  save() {
    if (this.startDate > this.endDate) {
      this.alertService.alertInfo('Error', 'Start date must before end date');
      return;
    }

    this.experienceService.S_experience.practice_name = 'default';

    this.experienceService.S_experience.start_time = this.startDate;
    this.experienceService.S_experience.end_time = this.endDate;

    if (this.experienceService.S_editIndex !== -1) {
      this.editExperience.emit(this.experienceService.S_experience);
    } else {
      this.addExperience.emit(this.experienceService.S_experience);
    }
    this.closeModal.emit();
  }



  toggleCurrentWork() {
    this.isCurrentWork = !this.isCurrentWork;
  }

  close() {
    this.experienceService.S_experience = {};
    this.closeModal.emit();
  }
}
