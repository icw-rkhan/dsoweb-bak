import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { CompanyService } from '../../../../services/company.service';
import { DSOCompany } from '../../../../models/dso-company.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'dso-career-profile-list',
  templateUrl: './profile-list.component.html',
  styleUrls: ['./profile-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareerProfileListComponent implements OnInit, OnDestroy {

  page: number;
  type: string;
  term: string;
  showGotoTopBtn: boolean;

  companies: DSOCompany[];

  subRoute: Subscription;

  constructor(
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService) {
      this.page = 1;

      this.subRoute = this.route.params.subscribe(params => {
        this.type = params['type'];
      });
  }

  ngOnInit() {
    if (this.type !== 'search') {
      this.loadContents();
    }
  }

  ngOnDestroy() {
    this.progress.complete();

    this.subRoute.unsubscribe();
  }

  loadContents() {
    this.progress.start();

    const body = {
      'searchValue': this.term,
      'pageNumber': this.page,
      'pageSize': 10
    };

    const subCompany = this.companyService.dsoCompanies(body).subscribe(companies => {
      this.progress.complete();

      if (this.companies) {
        this.companies = [
          ...this.companies,
          ...companies
        ];
      } else {
        this.companies = companies;
      }

      this.cdr.markForCheck();
      subCompany.unsubscribe();
    },
    err => {
      this.progress.complete();
    });
  }

  onSearch() {
    this.loadContents();
  }

  onLoadMore() {
    ++this.page;

    this.loadContents();
  }

  onScroll(event) {
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
}
