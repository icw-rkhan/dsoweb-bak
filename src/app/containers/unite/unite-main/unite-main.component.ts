import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

import { Unite } from '../../../models/unite.model';
import { UniteService } from '../../../services/unite.service';

@Component({
  selector: 'dso-unite-main',
  templateUrl: './unite-main.component.html',
  styleUrls: ['./unite-main.component.scss']
})
export class UniteMainComponent implements OnInit {

  unites: Unite[];

  constructor(
    private router: Router,
    private uniteService: UniteService) {
      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          switch (event.url) {
            case '/unite':
              this.unites = this.uniteService.makeTestDate().filter((unite: Unite) => {
                if (!unite.isDownload) {
                  return unite;
                }
              });
              break;
            case '/unite/all':
              this.unites = this.uniteService.makeTestDate();
              break;
            case '/unite/type/downloaded':
              this.unites = this.uniteService.makeTestDate().filter((unite: Unite) => {
                if (unite.isDownload) {
                  return unite;
                }
              });
              break;
          }
        }
      });
  }

  ngOnInit() {

  }
}
