import { Component, OnInit } from '@angular/core';
import { Unite } from '../../../models/unite.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UniteService } from '../../../services/unite.service';

@Component({
  selector: 'dso-unite-download',
  templateUrl: './unite-download.component.html',
  styleUrls: ['./unite-download.component.scss']
})
export class UniteDownloadComponent implements OnInit {

  unite: Unite;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private uniteService: UniteService) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];

      this.unite = this.uniteService.getUniteById(id);
    });
  }

  onCancelDownload() {
    this.location.back();
  }

}
