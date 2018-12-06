import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss']
})
export class CareerComponent implements OnInit {

  showMoreActionBar: boolean;

  constructor(private router: Router) {
    this.showMoreActionBar = false;
  }

  ngOnInit() {
  }

  clear() {
    this.showMoreActionBar = false;
  }

  onShowMoreActionBar(flag: number) {
    if (flag === 1) {
      this.showMoreActionBar = !this.showMoreActionBar;
    } else {
      this.clear();
    }
  }

  onGoTo(url: string) {
    this.showMoreActionBar = false;
    this.router.navigate([`/career/${url}`]);
  }
}
