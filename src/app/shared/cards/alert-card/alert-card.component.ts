import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Alert } from '../../../models/alert.model';

@Component({
  selector: 'dso-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AlertCardComponent implements OnInit {

  @Input() alert: Alert;

  showRemoveBtn: boolean;

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  constructor() {
    this.showRemoveBtn = false;
  }

  ngOnInit() {
  }

  onCheckAlert() {
    this.alert.status = !this.alert.status;
  }

  onCheckEdit() {

  }

  onCheckRemove() {

  }

  swipe(action) {
    if (action === this.SWIPE_ACTION.LEFT) {
      this.showRemoveBtn = true;
    } else {
      this.showRemoveBtn = false;
    }
  }
}
