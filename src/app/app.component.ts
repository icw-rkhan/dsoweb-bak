import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'dso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  withMainMenu: boolean;

  constructor(private router: Router) {
    this.withMainMenu = false;
  }

  ngOnInit() {
    this.router.events.subscribe(router => {
      if (router instanceof  NavigationStart) {
        const math = router.url.match(/^(?!.*auth).*$/g);
        this.withMainMenu = math !== null;
      }
    });
  }

}
