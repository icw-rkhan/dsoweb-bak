import { Component, EventEmitter, Output, Input } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'dso-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleMenu = new EventEmitter();

  title = "DSODENTIST";
  btnCategory = "menu";

  constructor(private router: Router, private _location: Location) {
    router.events.subscribe((event: Event)=> {
      if(event instanceof NavigationEnd) {
        if(event.url == '/feed') {
          this.setTitle('DSODENTIST');
          this.setBtnCategory('menu');

        }else if(event.url == '/reviews/add') {
          this.setTitle('ADD A REVIEW');
          this.setBtnCategory('keyboard_backspace');

        }else if(event.url == '/reviews/view') {
          this.setTitle('ALL REVIEWS');
          this.setBtnCategory('keyboard_backspace'); 

        }
      }
    })
  }

  onClickEvent() {
    if(this.btnCategory == "menu") {
      this.toggleMenu.emit();
    }else if (this.btnCategory == 'keyboard_backspace') {
      this._location.back();
    }
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setBtnCategory(category) {
    this.btnCategory = category;
  }

  getBtnCategory() {
    return this.btnCategory;
  }
}
