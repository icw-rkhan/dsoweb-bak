import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Alert } from '../../../models/alert.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertCardComponent implements OnInit {

  @Input() alert: Alert;

  @Output() toggleAlertEvent = new EventEmitter<string>();
  @Output() removeAlertEvent = new EventEmitter<string>();

  showRemoveBtn: boolean;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor(private router: Router) {
    this.showRemoveBtn = false;
  }

  ngOnInit() {
  }

  onCheckAlert() {
    this.toggleAlertEvent.emit(this.alert.id);
  }

  onCheckEdit() {
    this.router.navigate([`/career/alert/add/${this.alert.id}`]);
  }

  onCheckRemove() {
    this.removeAlertEvent.emit(this.alert.id);
  }

  swipe(action) {
    if (action === this.SWIPE_ACTION.LEFT) {
      this.showRemoveBtn = true;
    } else {
      this.showRemoveBtn = false;
    }
  }
}
