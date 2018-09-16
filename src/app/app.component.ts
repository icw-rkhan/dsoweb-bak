import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dso-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  withMainMenu: boolean;

  private routerSub: Subscription;

  constructor(private router: Router) {
    this.withMainMenu = false;
  }

  ngOnInit() {
    this.routerSub = this.router.events.subscribe(router => {
      if (router instanceof  NavigationStart) {
        this.withMainMenu = router.url !== '/'
                            && !router.url.includes('auth')
                            && router.url !== '/edit-profile';
      }
    });
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
