import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Residency } from '../../../models/residency.model';

@Component({
  selector: 'dso-residency-add',
  templateUrl: './residency-add.component.html',
  styleUrls: ['./residency-add.component.scss']
})
export class ResidencyAddComponent implements OnInit {
  @Input('residency') residency: Residency;
  @Output() addResidency: EventEmitter<Residency> = new EventEmitter(null);
  @Output() selectResidency: EventEmitter<number> = new EventEmitter(null);
  @Output() cancelResidency: EventEmitter<null> = new EventEmitter(null);
  year: number;
  isError = false;
  constructor() {}

  ngOnInit() {
    if (this.residency && this.residency.year) {
      this.year = this.residency.year;
    } else {
      this.year = null;
    }
  }

  save() {
    this.isError = false;
    if (!this.residency) {
      return;
    }
    if (!this.residency.year || this.residency.year < 1950 || this.residency.year > new Date().getFullYear()) {
      this.isError = true;
      return;
    }
    console.log('~~~~');
    this.addResidency.emit(this.residency);
  }

  changeYear(e) {
    if (this.residency) {
      this.residency.year = parseInt(e.target.value) || null;
    }
  }

  selectRedency() {
    const RESIDENCY_ADD = 2;
    this.selectResidency.emit(RESIDENCY_ADD);
  }

  _cancelResidency() {
    this.cancelResidency.emit();
  }

  keyDown(e) {
    if (!(parseInt(e.key) >= 0 && parseInt(e.key) <= 9) && e.keyCode != 8 || (e.target.value.length > 3) && e.keyCode != 8) {
      e.preventDefault();
      return;
    }
  }

}
