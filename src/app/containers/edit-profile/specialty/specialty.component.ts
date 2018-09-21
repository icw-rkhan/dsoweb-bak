import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Specialty} from '../../../models/speciality.model';

@Component({
  selector: 'dso-app-specialty',
  templateUrl: './specialty.component.html',
  styleUrls: ['./specialty.component.scss']
})
export class SpecialtyComponent implements OnInit {
  @Input('listSpecialty') listSpecialty: any[];
  @Input('specialty') specialty: Specialty;
  @Output() setSpecialty: EventEmitter<Specialty> = new EventEmitter(null);
  @Output() closeSpecialty: EventEmitter<null> = new EventEmitter(null);

  specialities: any[] = [];
  searchText = '';

  constructor() { }

  ngOnInit() {
    this.specialities = this.listSpecialty;
  }

  changeInput(e) {
    this.specialities = this.listSpecialty.filter((speciality: any) =>  speciality.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
  }

  _selectSpeciality(speciality: any) {
    this.searchText = speciality.name;
    this.setSpecialty.emit(speciality);
  }

  close() {
    this.closeSpecialty.emit();
  }
}
