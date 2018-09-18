import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Residency } from '../../../models/residency.model';

@Component({
  selector: 'dso-residency-edit',
  templateUrl: './residency-edit.component.html',
  styleUrls: ['./residency-edit.component.scss']
})
export class ResidencyEditComponent implements OnInit {
  @Input('residency') residency: Residency;
  @Output() updateResidency: EventEmitter<Residency> = new EventEmitter(null);
  isDelete = false;
  constructor() { }

  ngOnInit() {
  }

  deleteResidency() {
    console.log('here')
    this.isDelete = true;
  }

  _updateResidency() {
    this.updateResidency.emit(this.residency);
  }

}
