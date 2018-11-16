import { Component, EventEmitter, Output, ChangeDetectorRef, HostListener } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

import { NavLinkModel } from '../../models/nav-link.model';
import { NavLinksService } from '../../services/links.service';
import { esLocale } from 'ngx-bootstrap';

@Component({
  selector: 'dso-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleMenu = new EventEmitter();

  url: string;
  title: string;
  btnTitle: string;
  modalType: string;

  visible: boolean;
  isClickOptionsBtn: boolean;
  isViewMoreOptions: boolean;
  isViewMainOptions: boolean;
  isShowingOptionsModal: boolean;

  uniteMainLinks: NavLinkModel[];
  uniteMoreLinks: NavLinkModel[];
  uniteListLinks: NavLinkModel[];

  constructor(
    private router: Router,
    private _location: Location,
    private cdr: ChangeDetectorRef,
    private linksService: NavLinksService) {
      this.visible = true;
      this.isClickOptionsBtn = false;
      this.isShowingOptionsModal = false;
      this.isViewMoreOptions = false;
      this.isViewMainOptions = true;

      this.uniteMainLinks = this.linksService.uniteMainLinks;
      this.uniteMoreLinks = this.linksService.uniteMoreLinks;

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.visible = true;
          this.url = event.url;

          if (event.url.includes('/posts/sponsor')) {
            this.title = 'SPONSORED CONTENT';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/posts')) {
              this.title = 'DSODENTIST';
              this.btnTitle = 'menu';
          } else if (event.url.includes('/reviews/add')) {
              this.title = 'ADD A REVIEW';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/reviews/view')) {
              this.title = 'ALL REVIEWS';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/detail/sponsor')) {
              this.title = 'SPONSORED CONTENT';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/detail')) {
              this.title = '';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/bookmarks')) {
            this.title = 'BOOKMARKS';
            this.btnTitle = 'menu';
          } else if (event.url.includes('/category')) {
            this.title = 'CATEGORY';
            this.btnTitle = 'menu';
          } else if (event.url.includes('/search')) {
            this.title = 'SEARCH';
            this.btnTitle = 'menu';
          } else if (event.url.includes('/profile')) {
            this.title = 'PROFILE';
            this.btnTitle = 'menu';
          } else if (event.url.includes('/unite/view')) {
            this.visible = false;
          } else if (event.url.includes('/unite/bookmark')) {
            this.title = 'BOOKMARKS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/thumbnails')) {
            this.title = 'THUMBNAILS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/type/downloaded')) {
            this.title = 'DOWNLOADED';
            this.btnTitle = 'menu';
          } else if (event.url.includes('/unite/download')) {
            this.title = '';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite')) {
            this.title = 'ALL ISSUES';
            this.btnTitle = 'menu';
          } else {
            this.title = 'DSODENTIST';
            this.btnTitle = 'menu';
          }

          this.isShowingOptionsModal = false;

          this.viewMainOptions(event.url);
          this.viewMoreOptions(event.url);

          // remove the ADS code
          this.removeADSCode();

          this.cdr.markForCheck();
        }
      });
  }

  viewMoreOptions(url: string) {
    if (url.includes('/unite/detail') || url.includes('/unite/bookmark') || url.includes('/unite/thumbnails')) {
      this.isViewMoreOptions = true;
    } else {
      this.isViewMoreOptions = false;
    }
  }

  viewMainOptions(url: string) {
    if (!url.includes('/unite/bookmark') && !url.includes('/unite/detail') &&
                  url.includes('/unite') && !url.includes('/unite/thumbnails')) {
      this.isViewMainOptions = true;
    } else {
      this.isViewMainOptions = false;
    }
  }

  removeADSCode() {
    const old_childs = document.getElementsByClassName('ads_script');

    if (old_childs.length > 1) {
      document.head.removeChild(old_childs[0]);
      document.head.removeChild(old_childs[0]);
    }
  }

  onClickEvent() {
    if (this.btnTitle === 'menu') {
      this.toggleMenu.emit();
    } else if (this.btnTitle === 'keyboard_backspace') {
      this._location.back();
    }
  }

  onShowOptionModal(type: string) {
    if (this.modalType === type) {
      this.isShowingOptionsModal = !this.isShowingOptionsModal;
    } else {
      this.isShowingOptionsModal = true;
    }

    this.modalType = type;

    this.isClickOptionsBtn = true;
  }

  onOptionEvent(url) {
    this.router.navigate([url]);
  }

  @HostListener('window:click', [])
  onWindowEvent() {
    if (this.isShowingOptionsModal && !this.isClickOptionsBtn) {
      this.isShowingOptionsModal = false;
    } else {
      this.isClickOptionsBtn = false;
    }
  }

  @HostListener('window:resize', [])
  onWindowResizeEvent() {
    this.isShowingOptionsModal = false;
  }

  @HostListener('window:press', [])
  onWindowPressEvent() {
    this.isShowingOptionsModal = false;
  }

  @HostListener('window:scroll', [])
  onWindowScrollEvent() {
    this.isShowingOptionsModal = false;
  }
}
