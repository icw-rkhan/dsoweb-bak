import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

import { Unite } from '../../../models/unite.model';

@Component({
  selector: 'dso-unite-card',
  templateUrl: './unite-card.component.html',
  styleUrls: ['./unite-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteCardComponent implements OnInit {

  @Input() unite: Unite;

  constructor(private router: Router) {

  }

  ngOnInit() {

  }

  onDownloadIssue(id: string) {
    this.router.navigate([`/unite/download/${id}`]);
  }

  onViewIssue(id: string) {
    this.router.navigate([`/unite/view/${id}`]);
  }

}
