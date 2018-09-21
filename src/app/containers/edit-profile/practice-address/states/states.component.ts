import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Specialty} from '../../../../models/speciality.model';

@Component({
  selector: 'app-states',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.scss']
})
export class StatesComponent implements OnInit {
  @Input('listStates') listStates: any[];
  @Input('state') state: any;
  @Output() setState: EventEmitter<Specialty> = new EventEmitter(null);
  @Output() closeState: EventEmitter<null> = new EventEmitter(null);

  states: any[] = [];
  searchText = '';

  constructor() { }

  ngOnInit() {
    this.states = this.listStates;
  }

  changeInput(e) {
    this.states = this.listStates.filter((speciality: any) =>  speciality.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
  }

  _selectState(state: any) {
    this.searchText = state.name;
    this.setState.emit(state);
    this.closeState.emit();
  }

  close() {
    this.closeState.emit();
  }
}
