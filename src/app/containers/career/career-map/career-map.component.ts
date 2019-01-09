import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'dso-career-map',
  templateUrl: './career-map.component.html',
  styleUrls: ['./career-map.component.scss']
})
export class CareerMapComponent implements OnInit {

  latitude: number;
  longitude: number;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.latitude = parseFloat(params.lat);
      this.longitude = parseFloat(params.lng);
    });
  }

  ngOnInit() {
  }

}
