import { Component, EventEmitter, Output, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, Event, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { NavLinkModel } from '../../models/nav-link.model';
import { NavLinksService } from '../../services/links.service';

@Component({
  selector: 'dso-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent {

  @Output() toggleMenu = new EventEmitter();

  url: string;
  title: string;
  issueId: string;
  btnTitle: string;
  modalType: string;
  isSearch = false;

  visibleUniteMoreMenu: boolean;

  uniteMainLinks: NavLinkModel[];
  uniteMoreLinks: NavLinkModel[];
  uniteListLinks: NavLinkModel[];

  constructor(
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private linksService: NavLinksService) {
      this.visibleUniteMoreMenu = false;

      this.uniteMainLinks = this.linksService.uniteMainLinks;

      this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.url = event.url;
          this.title = 'DSODENTIST';
          this.btnTitle = 'menu';

          this.fetchIssueId(event.url);

          if (event.url.includes('/posts/sponsor')) {
            this.title = 'SPONSORED CONTENT';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/review/add')) {
              this.title = 'ADD A REVIEW';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/reviews/view')) {
              this.title = 'ALL REVIEWS';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/detail/sponsor')) {
              this.title = 'SPONSORED CONTENT';
              this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/search')) {
            this.title = 'SEARCH';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/view')) {
            this.title = '';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/bookmark')) {
            this.title = 'BOOKMARKS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/thumbnail')) {
            this.title = 'THUMBNAILS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite/type/downloaded')) {
            this.title = 'DOWNLOADED';
          } else if (event.url.includes('/unite/download')) {
            this.title = '';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/review')) {
            this.title = 'REVIEWS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/profile')) {
            this.title = 'DSO PROFILES';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/myjob')) {
            this.title = 'MY JOBS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/alert')) {
            this.title = 'JOB ALERTS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/oneself')) {
            this.title = 'ME';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/search') || event.url.includes('/career/detail')) {
            this.title = 'JOBS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career')) {
            this.title = 'CAREER';
          } else if (event.url.includes('/search')) {
            this.title = 'SEARCH';
          } else if (event.url.includes('/profile')) {
            this.title = 'PROFILE';
          } else if (event.url.includes('/detail')) {
            this.title = '';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/unite')) {
            this.title = 'ALL ISSUES';
          } else if (event.url.includes('/posts')) {
            this.title = 'DSODENTIST';
          } else if (event.url.includes('/bookmarks')) {
            this.title = 'BOOKMARKS';
          } else if (event.url.includes('/category')) {
            this.title = 'CATEGORY';
          }

          if (event.url.includes('/unite/')) {
            this.visibleUniteMoreMenu = true;
          } else {
            this.visibleUniteMoreMenu = false;
          }

          // if thumbnail page, hide the thumbnail option and show the full-screen option
          this.filterMoreOptions(event.url);

          this.cdr.markForCheck();
        }
      });
  }

  fetchIssueId(url: string) {
    const arr = url.split('/');

    if (arr.length > 3) {
      this.issueId = arr[3];
    } else {
      this.issueId = '';
    }
  }

  filterMoreOptions(url) {
    this.uniteMoreLinks = [];
    const moreLinks = this.linksService.uniteMoreLinks;
    moreLinks.map(link => {
      if ((url.includes('/unite/thumbnail') && link.label !== 'Thumbnails') ||
        ((!url.includes('/unite/thumbnail') && link.label !== 'Fullscreen'))) {
        this.uniteMoreLinks.push(link);
      }
    });
  }

  onOptionEvent(url: string) {
    if (url === '/unite/search') {
      this.isSearch = true;
      return;
    }
    this.isSearch = false;
    url = `${url}/${this.issueId}`;
    this.router.navigate([url]);
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
      this.location.back();
    }
  }

  closeSearchPanel() {
    this.isSearch = false;
  }
}
