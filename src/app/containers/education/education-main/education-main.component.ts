import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd, Event } from '@angular/router';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { SharingService } from 'src/app/services/sharing.service';
import { NavLinkModel } from 'src/app/models/nav-link.model';

import { environment } from 'src/environments/environment';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'dso-education-main',
  templateUrl: './education-main.component.html',
  styleUrls: ['./education-main.component.scss']
})
export class EducationMainComponent implements OnInit, OnDestroy {

  id: number;
  sponsorId: number;
  currentUrl: string;
  slideHeight: string;
  isPlaceholder: boolean;

  courses: Course[];
  navLinks: NavLinkModel[] = [];

  private routerSubs: Subscription;

  slideUrls: string[] = [
    'assets/images/education/course.png',
    'assets/images/education/course.png',
    'assets/images/education/course.png',
    'assets/images/education/course.png',
    'assets/images/education/course.png',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: any,
    private sharingService: SharingService) {
      const url = this.document.location.origin;

      if (url.includes('mobile.dsodentist.com')) {
        this.isPlaceholder = true;
      } else {
        this.isPlaceholder = false;
      }

      // get a current url
      this.router.events.subscribe((event: Event) => {
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
      this.route.params.subscribe(params => {
        this.id = params['id'];
        this.sponsorId = params['sponsorId'];
        this.navLinks = this.renderTabs(this.sponsorId);
      });
  }

  ngOnInit() {
    this.courses = [];
    const course = new Course();
    course.id = '1';
    course.title = 'Purpose Driven Dental Assisting';
    course.logoUrl = 'assets/images/education/course_logo.png';
    course.presenter = 'Dr.Anna Smith';
    course.rating = '4';
    course.level = 'beginner';
    course.duration = '3h 20m';
    course.cost = '19.50';

    const course2 = new Course();
    course2.id = '2';
    course2.title = 'Modern Dental Extractions - Fast, Painless, & Non-invasive';
    course2.logoUrl = 'assets/images/education/course_logo.png';
    course2.presenter = 'Dr.Anna Smith';
    course2.rating = '4';
    course2.level = 'Intermediate';
    course2.duration = '3h 20m';
    course2.cost = null;
    course2.isBookmarked = true;

    this.courses.push(course);
    this.courses.push(course2);
  }

  ngOnDestroy() {
    
  }

  isActive(link: NavLinkModel) {
    return this.currentUrl === link.route;
  }

  renderTabs(sponsorId: number) {
    const navLinks: NavLinkModel[] = [];
    if (sponsorId) {
      navLinks.push({
        label: 'Featured',
        route: `/education/sponsor/${sponsorId}`,
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
        route: `/education/sponsor/${sponsorId}/194`,
      });
      navLinks.push({
        label: 'Periodontics',
        route: `/education/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'Orthodontics',
        route: `/education/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'Pediatric Dentistry',
        route: `/education/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'Prosthodontics',
        route: `/education/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'Endodontics',
        route: `/education/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'Oral and Maxillofacial',
        route: `/education/sponsor/${sponsorId}/31`,
      });
      navLinks.push({
        label: 'Practice Management',
        route: `/education/sponsor/${sponsorId}/31`,
      });
    } else {
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
        route: '/education/type/194',
      });
      navLinks.push({
        label: 'Periodontics',
        route: '/education/type/31',
      });
      navLinks.push({
        label: 'Orthodontics',
        route: '/education/type/31',
      });
      navLinks.push({
        label: 'Pediatric Dentistry',
        route: '/education/type/31',
      });
      navLinks.push({
        label: 'Prosthodontics',
        route: '/education/type/31',
      });
      navLinks.push({
        label: 'Endodontics',
        route: '/education/type/31',
      });
      navLinks.push({
        label: 'Oral and Maxillofacial',
        route: '/education/type/31',
      });
      navLinks.push({
        label: 'Practice Management',
        route: '/education/type/31',
      });
    }
    return navLinks;
  }

}
