import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewChecked,
         ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgProgress } from '@ngx-progressbar/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-view',
  templateUrl: './unite-view.component.html',
  styleUrls: ['./unite-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteViewComponent implements OnInit, AfterViewChecked {

  id: string;
  coverPage: Post;
  posts: Post[];

  @ViewChild('viewContainer') viewContainer: ElementRef;

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private uniteService: UniteService) {
      this.coverPage = new Post();
      this.coverPage.title = 'cover';
      this.coverPage.thumbnail = 'assets/images/unite/cover-page.png';
    }

  ngOnInit() {
    this.progress.start();
    this.route.params.subscribe(params => {
      this.id = params['id'];

      const uniteSub = this.uniteService.findOneById(this.id).subscribe(posts => {
        this.posts = posts;

        this.cdr.markForCheck();

        this.progress.complete();
        uniteSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        uniteSub.unsubscribe();
      });
    });
  }

  ngAfterViewChecked() {
    this.onRelayout();
  }

  @HostListener('window:resize', [])
  onResizeEvent() {
    this.onRelayout();
  }

  onRelayout() {
    const parentTag = this.viewContainer.nativeElement;
    const heightOfCover = parentTag.getElementsByClassName('article-thumbnail')[0].offsetHeight;
    const articleTags = parentTag.getElementsByClassName('article-container');

    let index;
    for (index = 1; index < articleTags.length; index++) {
      parentTag.getElementsByClassName('article-container')[index].style.height =  `${heightOfCover - 3}px`;
    }

    this.cdr.detectChanges();
  }

  onNormalScreen() {
    this.router.navigate([`/unite/thumbnail/${this.id}`]);
  }
}
