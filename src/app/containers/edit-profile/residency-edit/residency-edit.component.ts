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
  @Output() cancelResidency: EventEmitter<null> = new EventEmitter(null);
  @Output() deleteResidency: EventEmitter<null> = new EventEmitter(null);
  isDelete = false;
  isError = false;
  constructor() { }

  ngOnInit() {
  }

  _deleteResidency() {
    this.isDelete = false;
    this.deleteResidency.emit();
  }

  changeYear(e) {
    if (this.residency) {
      this.residency.year = parseInt(e.target.value) || null;
    }
  }

  _updateResidency() {
    this.isError = false;
    if (this.residency.year < 1950 || this.residency.year > new Date().getFullYear()) {
      this.isError = true;
      return;
    }
    this.updateResidency.emit(this.residency);
  }

  keyDown(e) {
    if (!(parseInt(e.key) >= 0 && parseInt(e.key) <= 9) && e.keyCode != 8 || (e.target.value.length > 3) && e.keyCode != 8) {
      e.preventDefault();
      return;
    }
  }

  _cancelResidency() {
    this.cancelResidency.emit();
  }

}
