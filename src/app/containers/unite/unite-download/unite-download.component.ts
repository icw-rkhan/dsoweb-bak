import { Component, OnInit } from '@angular/core';
import { Unite } from '../../../models/unite.model';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UniteService } from '../../../services/unite.service';
import { NgProgress } from '@ngx-progressbar/core';

@Component({
  selector: 'dso-unite-download',
  templateUrl: './unite-download.component.html',
  styleUrls: ['./unite-download.component.scss']
})
export class UniteDownloadComponent implements OnInit {

  unite: Unite;

  constructor(
    private location: Location,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private uniteService: UniteService) {
      this.progress.start();

      this.route.params.subscribe(params => {
        const id = params['id'];

        const body = {
          'skip': 0,
          'limit': 0
        };

        const uniteSub = this.uniteService.findAll(body).subscribe(unites => {
          this.unite = unites.filter(u => {
            if (u.id === id) {
              return u;
            }
          })[0];

          this.progress.complete();
          uniteSub.unsubscribe();
        },
        err => {
          this.progress.complete();
          uniteSub.unsubscribe();
        });
      });
    }

  ngOnInit() {}

  onCancelDownload() {
    this.location.back();
  }

}
