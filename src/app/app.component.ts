import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  withMainMenu: boolean;

  private routerSub: Subscription;

  constructor(private router: Router) {
    this.withMainMenu = true;
  }

  ngOnInit() {
    // this.routerSub = this.router.events.subscribe(navigation => {
    //   if (navigation instanceof NavigationEnd) {
    //     const math = navigation.url.match(/^(?!.*auth).*$/g);
    //     this.withMainMenu = math !== null;
    //   }
    // });
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
  }

}
