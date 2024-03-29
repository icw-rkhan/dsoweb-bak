import { Component, OnInit, Inject, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, Event } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { NgProgress } from '@ngx-progressbar/core';
import { forkJoin, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators';
import * as _ from 'lodash';

import { SharingService } from 'src/app/services/sharing.service';
import { CourseService } from 'src/app/services/course.service';

import { NavLinkModel } from 'src/app/models/nav-link.model';
import { Course } from 'src/app/models/course.model';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'dso-education-main',
  templateUrl: './education-main.component.html',
  styleUrls: ['./education-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EducationMainComponent implements OnInit, OnDestroy {

  typeId: number;
  pageNum: number;
  sponsorId: number;
  currentUrl: string;
  slideHeight: string;
  isFeatured: boolean;
  isRecommended: boolean;
  isPlaceholder: boolean;
  showGotoTopBtn: boolean;

  courses: Course[];
  recommendCourses: Course[];

  totalFeaturedCourses: Course[];
  totalRecommendCourses: Course[];

  navLinks: NavLinkModel[] = [];

  routeSub: Subscription;
  routerSub: Subscription;

  slideUrls: string[] = [
    'assets/images/education/course.png',
    'assets/images/education/course.png',
    'assets/images/education/course.png',
    'assets/images/education/course.png',
    'assets/images/education/course.png',
  ];

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private courseService: CourseService,
    @Inject(DOCUMENT) private document: any,
    private sharingService: SharingService) {
      this.pageNum = 1;
      this.isRecommended = false;
      this.showGotoTopBtn = false;

      const url = this.document.location.origin;
      this.navLinks = this.renderTabs();

      if (url.includes('mobile.dsodentist.com')) {
        this.isPlaceholder = true;
      } else {
        this.isPlaceholder = false;
      }

      // get a current url
      this.routerSub = this.router.events.subscribe((event: Event) => {
        if (event instanceof NavigationEnd) {
          this.currentUrl = event.url;
        }
      });

      // check a device
      const device = this.sharingService.getMyDevice();

      if (device === 'desktop') {
        this.slideHeight = `${Math.round(parseInt(environment.fixedWidth, 10) * 0.55)}px`;
      } else {
        this.slideHeight = `${Math.round(document.body.clientWidth * 0.55)}px`;
      }

      // Check when it is a sponsor page
      this.routeSub = this.route.params.subscribe(params => {
        this.typeId = params['id'];

        if (this.typeId) {
          this.isFeatured = false;
        } else {
          this.isFeatured = true;
        }
      });
  }

  ngOnInit() {
    this.loadContents();

    this.isRecommended = true;
    this.loadContents();
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.routerSub.unsubscribe();
  }

  onLoadMore() {
    if (this.isFeatured) {
      return;
    }

    this.pageNum++;

    this.loadContents();
  }

  onShowMoreCourses() {
    this.courses = this.totalFeaturedCourses;
  }

  onShowMoreRecommendCourses() {
    this.courses = this.totalRecommendCourses;
  }

  loadContents() {
    let body;
    if (!this.isFeatured) {
      body = {
        pgnumber: this.pageNum,
        pgsize: 5,
        categoryId: this.typeId
      };
    } else {
      body = {
        pgnumber: 1,
        pgsize: 0,
        recommended: this.isRecommended
      };
    }

    this.progress.start();
    const courseService = this.courseService.courses(body);

    // Join bookmarks and post
    const courseSub = forkJoin(
      courseService,
      this.courseService.bookmarks({pgnumber: 1, pgsize: 0})
    ).pipe(
      map(items => items[0].map(p => {
        const bookmark = items[1].find(b => b.courseId === p.id);

        return Object.assign({}, p, {
          isBookmark: !_.isUndefined(bookmark),
          bookmarkId: !_.isUndefined(bookmark) ? bookmark.id : undefined
        });
      }))
    ).subscribe(courses => {
      this.progress.complete();

      if (!this.isFeatured) {
        this.courses = [
          ...this.courses,
          ...courses
        ];
      } else if (this.isRecommended) {
        this.recommendCourses = courses.slice(0, 2);
        this.totalRecommendCourses = courses;
      } else {
        this.courses = courses.slice(0, 2);
        this.totalFeaturedCourses = courses;
      }

      this.cdr.markForCheck();

      courseSub.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  onScroll(event) {
    if (this.isFeatured) {
      return;
    }

    const scrollPosition = event.srcElement.scrollTop;
    if (scrollPosition > 200) {
      this.showGotoTopBtn = true;
    } else {
      this.showGotoTopBtn = false;
    }
  }

  gotoTop() {
    document.getElementById('contents').scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  isActive(link: NavLinkModel) {
    return this.currentUrl === link.route;
  }

  renderTabs() {
    const navLinks: NavLinkModel[] = [];
    navLinks.push({
      label: 'Featured',
      route: '/education/type',
    });
    navLinks.push({
      label: 'Sponsored',
      subMenu: [
        {
          label: 'Align Technology',
          route: `/education/sponsor/${environment.SPONSOR_ALIGN}`
        },
        {
          label: 'GlaxoSmithKline',
          route: `/education/sponsor/${environment.SPONSOR_GSK}`
        },
        {
          label: 'Nobel Biocare',
          route: `/education/sponsor/${environment.SPONSOR_NOBEL}`
        }
      ],
    });
    navLinks.push({
      label: 'General Dentistry',
      route: '/education/type/1',
    });
    navLinks.push({
      label: 'Periodontics',
      route: '/education/type/2',
    });
    navLinks.push({
      label: 'Orthodontics',
      route: '/education/type/3',
    });
    navLinks.push({
      label: 'Pediatric Dentistry',
      route: '/education/type/4',
    });
    navLinks.push({
      label: 'Prosthodontics',
      route: '/education/type/5',
    });
    navLinks.push({
      label: 'Endodontics',
      route: '/education/type/6',
    });
    navLinks.push({
      label: 'Oral and Maxillofacial',
      route: '/education/type/7',
    });
    navLinks.push({
      label: 'Practice Management',
      route: '/education/type/8',
    });

    return navLinks;
  }
}
