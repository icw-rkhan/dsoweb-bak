import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ProfileService} from '../../../services';
import {ModalDirective} from 'ngx-bootstrap';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {
  @ViewChild('PracticeTypeModal') private practiceTypeModal: ModalDirective;

  @Input('experience') experience: any;
  @Input('practiceTypeList') practiceTypeList: any[];
  @Input('practiceRoleList') practiceRoleList: any[];
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() saveExperience: EventEmitter<any> = new EventEmitter(this.experience);

  constructor() {
  }

  ngOnInit() {
    console.log(this.experience);
    if (isNullOrUndefined(this.experience) || this.experience.length === 0) {
      this.experience = [];
      this.experience.push({});
    }
    console.log('after', this.experience);

  }

  selectPracticeType(p) {
    console.log(p);
    console.log(this.experience);
    this.experience[0]['practice_Type'] = {};
    this.experience[0]['practice_Type']['id'] = p.id;
    this.practiceTypeModal.hide();
  }

  save() {
    this.saveExperience.emit(this.experience);
  }

  close() {
    this.closeModal.emit();
  }
}
