import { Component, EventEmitter, Output } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';

@Component({
  selector: 'dso-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleMenu = new EventEmitter();

  title = "DSODENTIST";
  btnCategory = "menu";

  constructor(private router: Router) {
    router.events.subscribe((event: Event)=> {
      if(event instanceof NavigationEnd) {
        if(event.url == '/dsodentist') {

          this.setTitle('DSODENTIST');
          this.setBtnCategory('menu');

        }else if(event.url == '/reviews/add') {

          this.setTitle('ADD A REVIEW');
          this.setBtnCategory('keyboard_backspace');

        }else if(event.url == '/reviews/view') {

          this.setTitle('ALL REVIEWS');
          this.setBtnCategory('keyboard_backspace'); 

        }else if(event.url == '/downloads/download' ||
         event.url == '/downloads/filter' || 
         event.url == '/downloads/manage') {
           
          this.setTitle('DOWNLOADS');
          this.setBtnCategory('menu'); 
        }
      }
    })
  }

  onClickEvent() {
    if(this.btnCategory == "menu") {
      this.toggleMenu.emit();
    }else if (this.btnCategory == 'keyboard_backspace') {
      this.router.navigate(['/dsodentist']);
    }
  }

  setTitle(title) {
    this.title = title;
  }

  getTitle() {
    return this.title;
  }

  setBtnCategory(category) {
    this.btnCategory=category;
  }

  getBtnCategory() {
    return this.btnCategory;
  }
}
