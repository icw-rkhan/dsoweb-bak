import { Component, OnInit, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { PostService } from '../../../services/post.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-detail-relative',
  templateUrl: './relative.component.html',
  styleUrls: ['./relative.component.scss']
})
@Pipe({ name: 'safe'})
export class RelativeComponent implements OnInit, OnDestroy, PipeTransform {

    post: Post;
    postId: number;
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

    // filter categories
    filterCategories(categories) {
        if (categories && categories.length > 1) {
        return categories[1].name;
        } else if (categories && categories.length === 1) {
        return categories[0].name;
        }

        return '';
    }

    // post sponsor article by postId
    onPostSponsor(type) {
        let sponsorId: number;

        if (type === 'gsk') {
        sponsorId = 197;
        } else if (type === 'align') {
        sponsorId = 260;
        } else if (type === 'nobel') {
        sponsorId = 259;
        }

        this.router.navigate([`/posts/sponsor/${sponsorId}`]);
    }

    // check gsk tag
    isGsk(tags): boolean {
        if (tags && tags.includes(197)) {
        return true;
        }
        return false;
    }

    // check align tag
    isAlign(tags): boolean {
        if (tags && tags.includes(260)) {
        return true;
        }
        return false;
    }

    // check nobel tag
    isNobel(tags): boolean {
        if (tags && tags.includes(259)) {
        return true;
        }
        return false;
    }
}
