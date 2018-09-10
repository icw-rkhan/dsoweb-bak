import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dso-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  student: number;

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: any) => {
        if (params.student) {
          this.student = +params.student;
        }
      }
    );
  }
}
