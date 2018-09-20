import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Speciality} from '../../../models/speciality.model';

@Component({
  selector: 'dso-app-speciality',
  templateUrl: './speciality.component.html',
  styleUrls: ['./speciality.component.scss']
})
export class SpecialityComponent implements OnInit {
  @Input('listSpeciality') listSpeciality: any[];
  @Input('speciality') speciality: Speciality;
  @Output() setSpeciality: EventEmitter<Speciality> = new EventEmitter(null);
  @Output() closeSpeciality: EventEmitter<null> = new EventEmitter(null);

  specialities: any[] = [];
  searchText = '';

  constructor() { }

  ngOnInit() {
    this.specialities = this.listSpeciality;
  }

  changeInput(e) {
    this.specialities = this.listSpeciality.filter((speciality: any) =>  speciality.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
  }

  _selectSpeciality(speciality: any) {
    this.searchText = speciality.name;
    this.setSpeciality.emit(speciality);
  }

  close() {
    this.closeSpeciality.emit();
  }
}
