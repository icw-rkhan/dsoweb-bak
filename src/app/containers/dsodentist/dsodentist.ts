import { Component, OnInit } from '@angular/core';
import { DsodentistService } from '../../services/dsodentist.service';
import { Observable } from 'rxjs';
import { Dsodentist } from '../../models/dsodentist.model';

@Component({
  templateUrl: './dsodentist-page.html',
  styleUrls: ['./dsodentist-page.scss'],
})
export class DsodentistPageComponent implements OnInit {

  results: Observable<Dsodentist>;

  constructor(private dsodentistService: DsodentistService) {
  }

  ngOnInit(): void {
    this.results = this.dsodentistService.dsodentist({
      id: 0,
      name: 'dsodentist'
    });
  }

}
