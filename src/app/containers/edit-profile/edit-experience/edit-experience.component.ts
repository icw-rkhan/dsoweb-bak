import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-edit-experience',
  templateUrl: './edit-experience.component.html',
  styleUrls: ['./edit-experience.component.scss']
})
export class EditExperienceComponent implements OnInit {
  @Input('experience') experience: any;
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() saveExperience: EventEmitter<any> = new EventEmitter(this.experience);

  constructor() { }

  ngOnInit() {
  }

  save() {
    this.saveExperience.emit(this.experience);
  }

  close() {
    this.closeModal.emit();
  }
}
