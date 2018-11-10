import { Component, OnInit, Input } from '@angular/core';
import { Unite } from '../../models/unite.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-unite-card',
  templateUrl: './unite-card.component.html',
  styleUrls: ['./unite-card.component.scss']
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
