import { Component, EventEmitter, Output, ChangeDetectorRef, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
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
export class ToolbarComponent implements OnInit, OnDestroy {

  @Output() toggleMenu = new EventEmitter();

  url: string;
  title: string;
  issueId: string;
  btnTitle: string;
  modalType: string;
  isSearch = false;

  visibleUniteMoreMenu: boolean;
  visibleCareerAddOption: boolean;
  visibleCareerSearchOption: boolean;

  uniteMainLinks: NavLinkModel[];
  uniteMoreLinks: NavLinkModel[];
  uniteListLinks: NavLinkModel[];

  constructor(
    private router: Router,
    private location: Location,
    private cdr: ChangeDetectorRef,
    private linksService: NavLinksService) {
      this.visibleUniteMoreMenu = false;
      this.visibleCareerAddOption = false;
      this.visibleCareerSearchOption = true;

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
          } else if (event.url.includes('/reviews/add')) {
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
          } else if (event.url.includes('/career/review/detail')) {
            const subURL = event.url.split('?')[0];
            this.title = subURL.split('/')[subURL.split('/').length - 1].replace(/%20/g, ' ');
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/review')) {
            this.title = 'REVIEWS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/dso-profile/detail')) {
            this.title = 'DSO COMPANY';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/dso-profile')) {
            this.title = 'DSO PROFILES';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/my-job')) {
            this.title = 'MY JOBS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/alert/add')) {
            this.title = 'CREATE JOB ALERT';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/alert')) {
            this.title = 'JOB ALERTS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/map')) {
            this.title = 'MAP';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/career/search') || event.url.includes('/career/detail')) {
            this.title = 'JOBS';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/setting/about')) {
            this.title = 'ABOUT';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/setting/support/contact')) {
            this.title = 'CONTACT US';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/setting/support/help')) {
            this.title = 'HELP AND FEEDBACK';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/setting/support')) {
            this.title = 'FEEDBACK AND SUPPORT';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/setting/password')) {
            this.title = 'CHANGE PASSWORD';
            this.btnTitle = 'keyboard_backspace';
          } else if (event.url.includes('/setting')) {
            this.title = 'SETTINGS';
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
          } else if (event.url.includes('/education')) {
            this.title = 'EDUCATION';
          } else if (event.url.includes('/event')) {
            this.title = 'EVENTS';
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

          if (event.url.includes('/career/review/view') || event.url === '/career/alert') {
            this.visibleCareerAddOption = true;
          } else {
            this.visibleCareerAddOption = false;
          }

          if (event.url === '/career/search' || event.url === '/career/review'
          || event.url === '/career/dso-profile') {
            this.visibleCareerSearchOption = true;
          } else {
            this.visibleCareerSearchOption = false;
          }

          // if thumbnail page, hide the thumbnail option and show the full-screen option
          this.filterMoreOptions(event.url);

          this.cdr.markForCheck();
        }
      });
  }

  ngOnInit() {
    // window.addEventListener('scroll', this.onScrollEvent, true);
  }

  ngOnDestroy() {
    // window.removeEventListener('scroll', this.onScrollEvent, true);
  }

  onScrollEvent = (): void => {
    console.log('~ scroll event ~');
  }

  fetchIssueId(url: string) {
    const arr = url.split('/');

    if (arr.length > 4) {
      this.issueId = arr[4];
    } else if (arr.length > 3) {
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

  onClickEvent() {
    if (this.btnTitle === 'menu') {
      this.toggleMenu.emit();
    } else if (this.btnTitle === 'keyboard_backspace') {
      if (this.url.includes('/unite')) {
        this.router.navigate(['/unite']);
      } else {
        this.location.back();
      }
    }
  }

  closeSearchPanel() {
    this.isSearch = false;
  }

  onGoToAddReview() {
    if (this.url.includes('/career/review/view')) {
      const id = this.url.split('/')[4];
      this.router.navigate([`/career/review/add/${id}`]);
    } else {
      this.router.navigate(['/career/alert/add']);
    }
  }

  onGoToSearchJobs() {
    if (this.url === '/career/dso-profile') {
      this.router.navigate(['/career/dso-profile/search']);
    } else if (this.url === '/career/review') {
      this.router.navigate(['/career/review/search']);
    } else {
      this.router.navigate(['/career/search/criteria']);
    }
  }
}
