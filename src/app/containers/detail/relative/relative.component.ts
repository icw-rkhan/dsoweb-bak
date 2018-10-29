import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dso-detail-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.scss']
})
@Pipe({ name: 'safe'})
export class RelativeComponent implements OnInit, OnDestroy, PipeTransform {

    post: Post;
    postId: string;
    relativePostUrl: SafeResourceUrl;

    paramsSub: Subscription;

    constructor(
        private router: Router,
        private progress: NgProgress,
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
        private postService: PostService) {
        this.post = new Post();
    }

    ngOnInit() {
        this.paramsSub = this.route.params.subscribe(params => {
            this.progress.start();
            this.postId = params['id'];

            const url = `https://wp.dsodentist.com/${params['y']}/${params['m']}/${params['d']}/${params['title']}`;

            this.relativePostUrl = this.transform(url);

            const postSub = this.postService.fetchById(this.postId).subscribe(p => {
              this.post = p;

              this.progress.complete();
              postSub.unsubscribe();
            },
            err => {
              this.progress.complete();
              postSub.unsubscribe();
            });
        });
    }

    ngOnDestroy() {

    }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    // post sponsor article by postId
    onPostSponsor(type) {
        let sponsorId;

        if (type === 'gsk') {
            sponsorId = environment.SPONSOR_GSK;
        } else if (type === 'align') {
            sponsorId = environment.SPONSOR_ALIGN;
        } else if (type === 'nobel') {
            sponsorId = environment.SPONSOR_NOBEL;
        }

        this.router.navigate([`/posts/sponsor/${sponsorId}`]);
    }

    // check gsk tag
    isGsk(sponsorId): boolean {
        if (sponsorId === environment.SPONSOR_GSK) {
        return true;
        }
        return false;
    }

    // check align tag
    isAlign(sponsorId): boolean {
        if (sponsorId === environment.SPONSOR_ALIGN) {
        return true;
        }
        return false;
    }

    // check nobel tag
    isNobel(sponsorId): boolean {
        if (sponsorId === environment.SPONSOR_NOBEL) {
        return true;
        }
        return false;
    }
}
