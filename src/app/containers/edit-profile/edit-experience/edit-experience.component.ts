import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditProfileService} from '../edit-profile.service';
import {MAT_DATE_FORMATS, MatDatepicker} from '@angular/material';
import {AlertService} from '../../../services/alert.service';
import {isNullOrUndefined} from 'util';

export const MY_FORMATS = {
  parse: {
    dateInput: 'dd/MM/YYYY',
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
              public alertService: AlertService) {}

  ngOnInit() {
    this.isCurrentWork = false;
    if (isNullOrUndefined(this.experienceService.S_experienceEdit)) {
      this.title = 'Add Experience';
      this.experienceService.S_experience = {};
    } else {
      this.title = 'Edit Experience';
      this.experienceService.S_experience = this.experienceService.S_experienceEdit;
      this.startDate = new Date(this.experienceService.S_experienceEdit.start_time);
      if (this.experienceService.S_experienceEdit.end_time) {
        this.endDate = new Date(this.experienceService.S_experienceEdit.end_time);
      } else {
        this.isCurrentWork = true;
      }
    }
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
    if (!this.experienceService.S_experience.practice_Type) {
      this.alertService.errorAlert('Practice type can\'t be blank.');
      return;
    }

    if (!this.experienceService.S_experience.practice_Role) {
      this.alertService.errorAlert('Practice role can\'t be blank.');
      return;
    }

    if (!this.experienceService.S_experience.practice_Role) {
      this.alertService.errorAlert('Name of Dental Support Organization can\'t be blank.');
      return;
    }

    if (!this.startDate) {
      this.alertService.errorAlert('Working time can\'t be blank.');
      return;
    }

    if (!this.endDate && !this.isCurrentWork) {
      this.alertService.errorAlert('Working time can\'t be blank.');
      return;
    }

    if (!this.isCurrentWork && this.startDate > this.endDate) {
      this.alertService.errorAlert('Start date must before end date');
      return;
    }

    if (this.isCurrentWork) {
      this.endDate = undefined;
    }

    this.experienceService.S_experience.practice_name = 'default';

    this.experienceService.S_experience.start_time = this.startDate;
    this.experienceService.S_experience.end_time = this.endDate;

    if (this.experienceService.S_editIndex !== -1) {
      this.editExperience.emit(this.experienceService.S_experience);
    } else {
      this.addExperience.emit(this.experienceService.S_experience);
    }
    this.experienceService.S_experience = {};
    this.experienceService.S_experienceEdit = undefined;
    this.experienceService.S_editIndex = -1;
    this.closeModal.emit();
  }



  toggleCurrentWork() {
    this.isCurrentWork = !this.isCurrentWork;

    if (this.isCurrentWork) {
      this.endDate = new Date();
    }
  }

  close() {
    this.experienceService.S_experience = {};
    this.experienceService.S_experienceEdit = undefined;
    this.experienceService.S_editIndex = -1;
    this.closeModal.emit();
  }
}
