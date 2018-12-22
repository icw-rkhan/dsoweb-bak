import { Component, OnInit, HostListener, ViewChild, ElementRef, AfterViewChecked,
         ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgProgress } from '@ngx-progressbar/core';

import { UniteService } from '../../../services/unite.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'dso-unite-view',
  templateUrl: './unite-view.component.html',
  styleUrls: ['./unite-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UniteViewComponent implements OnInit, OnDestroy, AfterViewChecked {

  id: string;
  coverPage: Post;

  posts: Post[];

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

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
        this.progress.complete();

        this.posts = posts;

        this.cdr.markForCheck();
        uniteSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        uniteSub.unsubscribe();
      });
    });
  }

  ngOnDestroy() {
    this.progress.complete();
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
      parentTag.getElementsByClassName('article-container')[index].style.height =  `calc(100vh - 45px)`;
    }

    this.cdr.detectChanges();
  }

  onNormalScreen() {
    this.router.navigate([`/unite/thumbnail/${this.id}`]);
  }

  swipe(action) {
    const step = document.body.scrollWidth;
    let index = 0;

    const currentPos = this.viewContainer.nativeElement.scrollLeft;
    const timer = setInterval(() => {
      if (step - index < 10) {
        index ++;
      } else {
        index = index + 10;
      }

      if (action === this.SWIPE_ACTION.RIGHT) {
        this.viewContainer.nativeElement.scrollTo(currentPos - index, 0);
      } else {
        this.viewContainer.nativeElement.scrollTo(currentPos + index, 0);
      }

      if (index >= step) {
        clearInterval(timer);
      }
    }, 0);
  }
}
