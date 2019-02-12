import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'dso-career-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReviewAddComponent implements OnInit {

  id: string;
  rate: number;
  title: string;
  pros: string;
  cons: string;
  advice: string;
  isCheckedCE: boolean;
  isCheckedFE: boolean;
  isCheckedRC: boolean;
  isCheckedAC: boolean;

  rateList = [
    {state: false},
    {state: false},
    {state: false},
    {state: false},
    {state: false}
  ];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private companyService: CompanyService) {
    this.rate = 0;
    this.title = '';
    this.pros = '';
    this.cons = '';
    this.advice = '';
    this.isCheckedCE = false;
    this.isCheckedFE = false;
    this.isCheckedRC = false;
    this.isCheckedAC = false;

    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
  }

  onAddComment() {
    const body = {
      'dsoId': this.id,
      'reviewTitle': this.title,
      'pros': this.pros,
      'cons': this.cons,
      'rating': this.rate,
      'advice': this.advice,
      'isCurrentEmployee': this.isCheckedCE,
      'isFormerEmployee': this.isCheckedFE,
      'isRecommend': this.isCheckedRC,
      'isApprove': this.isCheckedAC
    };

    const subCompany = this.companyService.setComment(body).subscribe((res: any) => {
      if (res.code === 0) {
        this.location.back();
      }

      subCompany.unsubscribe();
    });
  }

  // make a rating point
  eventRating(i) {
    this.rate = i + 1;
  }

  checkFE() {
    this.isCheckedFE = !this.isCheckedFE;

    if (this.isCheckedFE) {
      this.isCheckedCE = false;
    }
  }

  checkCE() {
    this.isCheckedCE = !this.isCheckedCE;

    if (this.isCheckedCE) {
      this.isCheckedFE = false;
    }
  }

  checkRC() {
    this.isCheckedRC = !this.isCheckedRC;
  }

  checkAC() {
    this.isCheckedAC = !this.isCheckedAC;
  }
 }
