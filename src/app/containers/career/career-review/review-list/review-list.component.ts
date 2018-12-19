import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';

import { DSOCompany } from '../../../../models/dso-company.model';
import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'dso-career-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewListComponent implements OnInit, OnDestroy {

  page: number;
  showGotoTopBtn: boolean;

  companies: DSOCompany[];

  constructor(
    private progress: NgProgress,
    private cdr: ChangeDetectorRef,
    private companyService: CompanyService) {
      this.page = 1;
  }

  ngOnInit() {
    this.loadContents();
  }

  ngOnDestroy() {
    this.progress.complete();
  }

  loadContents() {
    this.progress.start();

    const body = {
      'pageNumber': this.page,
      'pageSize': 50
    };

    this.companyService.dsoCompanies(body).subscribe(companies => {
      this.progress.complete();

      this.companies = companies;

      this.cdr.markForCheck();
    },
    err => {
      this.progress.complete();
    });
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
