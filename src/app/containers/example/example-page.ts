import { Component, OnInit } from '@angular/core';
import { ExampleService } from '../../services/example.service';
import { Observable } from 'rxjs';
import { Example } from '../../models/example.model';

@Component({
  templateUrl: './example-page.html',
  styleUrls: ['./example-page.scss'],
})
export class ExamplePageComponent implements OnInit {

  results: Observable<Example>;

  constructor(private exampleService: ExampleService) {
  }

  ngOnInit(): void {
    this.results = this.exampleService.example({
      id: 0,
      name: 'example'
    });
  }

}
