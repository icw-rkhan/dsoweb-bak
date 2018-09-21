import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {EditProfileService} from '../edit-profile.service';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() editExperience: EventEmitter<any> = new EventEmitter(null);

  constructor(public experienceService: EditProfileService) {
  }

  ngOnInit() {
  }

  save() {
    this.editExperience.emit(this.experienceService.S_experiences);
    this.closeModal.emit();
  }

  close() {
    this.experienceService.S_experiences = [{}];
    this.closeModal.emit();
  }
}
