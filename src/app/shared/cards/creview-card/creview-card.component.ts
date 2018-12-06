import { Component, OnInit, Input } from '@angular/core';
import { CComment } from '../../../models/ccomment.model';

@Component({
  selector: 'dso-creview-card',
  templateUrl: './creview-card.component.html',
  styleUrls: ['./creview-card.component.scss']
})
export class CreviewCardComponent implements OnInit {

  @Input() comment: CComment;

  rating: number;
  rateList = [{state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}, {state: 'inactive'}];

  constructor() {}

  ngOnInit() {
    this.rating = Math.round(parseInt(this.comment.rating, 10));
  }

}
