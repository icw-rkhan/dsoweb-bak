import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CompanyService } from '../../../../services/company.service';

@Component({
  selector: 'dso-career-review-add',
  templateUrl: './review-add.component.html',
  styleUrls: ['./review-add.component.scss']
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
    this.isCheckedCE = true;
    this.isCheckedFE = false;
    this.isCheckedRC = true;
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
      'advice': this.advice,
      'isCurrentEmployee': this.isCheckedCE,
      'isFormerEmployee': this.isCheckedFE,
      'isRecommend': this.isCheckedRC,
      'isApprove': this.isCheckedAC
    };

    this.companyService.setComment(body).subscribe((res: any) => {
      if (res.code === 0) {
        this.location.back();
      }
    });
  }

  // make a rating point
  eventRating(i) {
    this.rate = i + 1;
  }

  checkFE() {
    this.isCheckedFE = !this.isCheckedFE;
  }

  checkCE() {
    this.isCheckedCE = !this.isCheckedCE;
  }

  checkRC() {
    this.isCheckedRC = !this.isCheckedRC;
  }

  checkAC() {
    this.isCheckedAC = !this.isCheckedAC;
  }
 }
