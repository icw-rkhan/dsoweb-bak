import {Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef,
    ChangeDetectionStrategy, ChangeDetectorRef, Inject, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router, Event, NavigationEnd } from '@angular/router';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { DOCUMENT } from '@angular/platform-browser';
import { NgProgress } from '@ngx-progressbar/core';
import { formatDate } from '@angular/common';

import { BookmarkService } from '../../../services/bookmark.service';
import { CommentService } from '../../../services/comment.service';
import { SharingService } from 'src/app/services/sharing.service';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services';

import { Bookmark } from '../../../models/bookmark.model';
import { Comment } from '../../../models/comment.model';
import { Post } from '../../../models/post.model';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'dso-detail-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommonComponent implements OnInit, OnDestroy, AfterViewChecked {

  post: Post;
  posts: Post[];
  galleries: any[];
  visualEssayImages: any[];

  rate: number;
  index: number;
  postId: string;
  scrollY: number;
  sharedUrl: string;
  isLoaded: boolean;
  contentUrl: string;
  authorName: string;
  authorInfo: string;
  isRendered: boolean;
  currentIndex: number;
  authorAvatar: string;
  review_count: number;
  contentTypeId: number;
  isDisabledPrev: boolean;
  isDisabledNext: boolean;
  showReference: boolean;
  isAuthorVisible: boolean;
  showGalleryView: boolean;
  showVisualEssayView: boolean;
  showReferenceState: string;

  comments: Comment[];

  rateList = [
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'}
  ];

  SWIPE_ACTION = {LEFT: 'swipeleft', RIGHT: 'swiperight'};

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('postContent') postContent: ElementRef;
  @ViewChild('authorContent') authorContent: ElementRef;
  @ViewChild('viewContainer') viewContainer: ElementRef;
  @ViewChild('galleryView') galleryView: ElementRef;
  @ViewChild('visualEssayView') visualEssayView: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private authService: AuthService,
    private sharingService: SharingService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService) {

    this.rate = 0;
    this.scrollY = 0;
    this.currentIndex = 1;
    this.review_count = 0;
    this.contentUrl = environment.cmsAPIUrl;

    this.isLoaded = false;
    this.isRendered = false;
    this.showReference = false;
    this.isDisabledPrev = false;
    this.isDisabledNext = false;
    this.isAuthorVisible = false;
    this.showGalleryView = false;
    this.showVisualEssayView = false;

    this.showReferenceState = 'Show more';

    this.post = new Post();

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.sharedUrl = event.url;
      }
    });

    this.route.params.subscribe(params => {
      this.postId = params['id'];
    });
  }

  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.loadContent();
  }

  ngAfterViewChecked() {
    if (this.postContent.nativeElement.innerHTML !== '' && !this.isRendered) {
      this.changeLayoutOfPost();

      if (this.isLoaded) {
        this.isRendered = true;
      }
    }
  }

  loadContent() {
    this.progress.start();
    const commentSub = this.commentService.comments(this.postId).subscribe(c => {
      this.comments = c;

      commentSub.unsubscribe();
    },
    err => {
      this.progress.complete();
      commentSub.unsubscribe();
    });

    const postSub = this.postService.fetchById(this.postId).subscribe(p => {
      this.progress.complete();

      const temp = p;
      temp.content = this.addRelativeAndReference(temp);
      temp.content = this.changePreToDiv(temp.content);

      this.post = temp;

      this.loadVisualEssay();

      this.contentTypeId = parseInt(this.post.contentTypeId, 10);
      this.loadContentsByContentType();

      this.fetchAuthorInfo();

      if (this.post.content) {
        this.setDropcap();
      }

      this.isLoaded = true;

      this.cdr.markForCheck();

      window.scroll({
        top: 0,
        left: 0
      });

      postSub.unsubscribe();
    },
    err => {
      this.progress.complete();
      postSub.unsubscribe();
    });
  }

  loadContentsByContentType() {
    const body = {
      type: this.contentTypeId,
      page: 0,
      per_page: 0
    };

    const subPost = this.postService.fetchByContentTypeId(body).subscribe(posts => {
      posts.map(post => {
        if (post.id === this.postId) {
          this.index = posts.indexOf(post);
        }
      });

      this.posts = posts;
      this.checkMoveTo();

      subPost.unsubscribe();
    });
  }

  loadVisualEssay() {
    if (this.post.visualEssayIDs && this.post.visualEssayIDs.length > 0) {
      const visualSub = this.postService.visualEssays(this.post.visualEssayIDs[0]).subscribe(essay => {
        this.post.visualEssay = essay;

        visualSub.unsubscribe();
      },
      err => {
        console.log(err);
      });
    }
  }

  checkMoveTo() {
    if (this.index === 0) {
      this.isDisabledPrev = true;
    } else {
      this.isDisabledPrev = false;
    }

    if (this.index === this.posts.length - 1 ) {
      this.isDisabledNext = true;
    } else {
      this.isDisabledNext = false;
    }

    this.cdr.markForCheck();
  }

  goToPrev() {
    if (this.index > 0) {
      this.index--;
      this.postId = this.posts[this.index].id;
      this.loadContent();

      this.checkMoveTo();
    }
  }

  goToNext() {
    if (this.index < this.posts.length - 1) {
      this.index++;
      this.postId = this.posts[this.index].id;
      this.loadContent();

      this.checkMoveTo();
    }
  }

  setDropcap(): void {
    const matches = this.post.content.match(/(<p[^>]*>.*?<\/p>)/g);
    const first = matches[0];

    let content = this.post.content;
    if (first === '<p>&nbsp;</p>' || first.includes('(By By')) {
      content = content.replace(first, '');
    }

    this.post.content = content.replace(/(<p[^>]*>((?!iframe).)*<\/p>)/, '<div class="first-big">$1</div>');

    if (!this.post.content.includes('<div class="first-big">')) {
      this.post.content = content.replace(/(<p[^>]*><span[^>]*>.*?<\/span><\/p>)/, '<div class="first-big">$1</div>');
    }
  }

  ngOnDestroy(): void {
    this.progress.complete();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.showGalleryView || this.showVisualEssayView) {
      window.scrollTo(0, this.scrollY);
    } else {
      this.scrollY = window.scrollY;
    }

    this.trigger.closeMenu();
  }

  @HostListener('window:resize', [])
  onWindowResize() {
    if (this.galleryView) {
      this.galleryView.nativeElement.style.top = window.scrollY + 'px';
      this.scrollY = window.scrollY;
    }

    if (this.visualEssayView) {
      this.visualEssayView.nativeElement.style.top = window.scrollY + 'px';
      this.scrollY = window.scrollY;
    }
  }

  // change Pre tag to Div tag
  changePreToDiv(html) {
    html = html.toString();

    html = html.replace(/<pre>/g, '<div><p>“</p><p>');
    html = html.replace(/<\/pre>/g, '</p></div>');

    return html;
  }

  // change the layout of a post
  changeLayoutOfPost() {
    this.reLayout('div');
    this.reLayout('table');
    this.reLayout('figcaption');
    this.reLayout('ol');
  }

  // custome the style of the content
  reLayout(tagName): void {
    const paretTag = this.postContent.nativeElement;
    const tag = paretTag.getElementsByTagName(tagName);
    if (tag && tag.length > 0) {

      let i = 0;
      for (i = 0; i < tag.length; i++) {
        switch (tagName) {
          case 'div':
            this.changeFormatOfCallOut(tag[i]);
            break;
          case 'figcaption':
            tag[i].innerHTML = this.changeFont(tag[i]);
            break;
          case 'table':
            this.changeTableFormat(tag[i]);
            break;
          case 'ol':
            const prevElement = tag[i].previousElementSibling;
            if (prevElement && prevElement.tagName === 'H2' && prevElement.innerHTML.indexOf('References') > -1) {
              if (tag[i].children.length > 5) {
                tag[i].classList.add('show-more');
                setTimeout(() => {
                  this.showReference = true;
                });
              } else {
                setTimeout(() => {
                  this.showReference = false;
                });
              }
            }
            break;
          default:
            break;
        }

        tag[i].style.width = '100%';
        tag[i].style.height = 'auto';
      }
    }
  }

  // modify the format of callout
  changeFormatOfCallOut(tag) {
    const pTagArr = tag.getElementsByTagName('p');

    if (pTagArr && pTagArr.length === 2) {
      pTagArr[0].classList.add('callout');
      pTagArr[0].classList.add('symbol');

      pTagArr[1].classList.add('callout');
      pTagArr[1].classList.add('text');

      pTagArr[0].style.height = pTagArr[1].offsetHeight + 'px';
    }
  }

  // modify the format of a table
  changeTableFormat(tag) {
    tag.removeAttribute('width');

    const trTag = tag.getElementsByTagName('tr');

    let index = 0;
    for (index = 0; index < trTag.length; index++) {
      const tdTagArr = trTag[index].getElementsByTagName('td');

      if (tdTagArr && tdTagArr.length === 2) {
        tdTagArr[0].removeAttribute('width');
        tdTagArr[1].removeAttribute('width');

        tdTagArr[0].style.width = '5%';
        tdTagArr[1].style.width = '95%';
      }
    }
  }

  // change the font if tagName is figcaption
  changeFont(tag) {
    // font family
    let text = tag.innerHTML;

    const textArray = text.split('.');
    if (!text.includes('font-weight') &&
     textArray.length > 0 && textArray[0].includes('Figure')) {
      text = text.replace(textArray[0], `<span style="font-weight:700">${textArray[0]}</span>`);
    }

    // font style
    tag.style.fontStyle = 'italic';

    // font size
    const fontSize = parseInt(window.getComputedStyle(tag).fontSize, 10);
    switch (fontSize) {
      case 16:
        tag.style.fontSize = '15px';
        break;
      case 15:
        tag.style.fontSize = '14px';
        break;
      case 14:
        tag.style.fontSize = '13px';
        break;
      case 12:
        tag.style.fontSize = '11px';
        break;
      default:
        break;
    }

    return text;
  }

  addRelativeAndReference(post: any) {
    let relativeContents = '';
    if (post.relativeTopics) {
      let relates = '';
      post.relativeTopics.map(rel => {
        relates = relates + `<p><a href="${this.document.location.origin}/detail/${rel.id}">${rel.title}</a></p>`;
      });

      if (relates !== '') {
        relativeContents = `<p>&nbsp</p><h2>Related Resources</h2>${relates}`;
      }
    }

    let referenceContents = '';
    if (post.references && post.references.length > 0) {
      let references = '';
      post.references.map((ref: string) => {
        references = references + `<li>${ref}</li>`;
      });

      if (references !== '') {
        referenceContents = `<p>&nbsp</p><h2>References</h2><ol>${references}</ol>`;
      }
    }

    return post.content + relativeContents + referenceContents;
  }

  // fetch an author/speaker's name
  fetchAuthorInfo() {
    this.authorAvatar = this.post.authorPhotoUrl;
    this.authorName = this.post.authorName;
    this.authorInfo = this.post.authorDetails;

    this.activeAuthorLayout();
  }

  feedsByAuthor() {
    this.router.navigate([`/detail/author/${this.post.authorId}`]);
  }

  onClickReference() {
    const reference = this.postContent.nativeElement.getElementsByTagName('ol')[0];
    if (reference.classList.contains('show-more')) {
      this.showReferenceState = 'Show less';
      reference.classList.remove('show-more');
      reference.classList.add('show-less');
    } else {
      this.showReferenceState = 'Show more';
      reference.classList.remove('show-less');
      reference.classList.add('show-more');
    }
  }

  // set format of an author field
  activeAuthorLayout() {
    if (this.authorName) {
      this.isAuthorVisible = true;

      if (this.authorInfo) {
        this.authorContent.nativeElement.style.marginTop = '5px';
      }
    }
  }

  // post the page to review all comments with postId
  onViewAll(postId): void {
    this.router.navigate([`/reviews/view/${postId}`]);
  }

  // post the page to add reivew with postId
  onAddReview(postId, title, date): void {
    this.router.navigate([`/reviews/add/${postId}/${title}/${date}`]);
  }

  // add bookmark
  onAddBookmark(): void {
    const userEmail = this.authService.getUserInfo().user_name;

    const bookmarkSub = this.bookmarkService.saveBookmark(<Bookmark>{
      email: userEmail,
      title: this.post.title,
      postId: this.post.id.toString(),
      categoryId: this.post.categoryId.toString(),
      contentTypeId: this.post.contentTypeId,
      url: 'http://www.dsodentist.com',
      status: '1'
    }).subscribe((x: any) => {
      if (x.code === 0) {
        this.post.isBookmark = true;

        this.snackBar.open('Bookmark added', 'OK', {
          duration: 2000,
        });
      } else {
        this.post.isBookmark = false;

        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }

      this.cdr.markForCheck();
      bookmarkSub.unsubscribe();
    });
  }

  // remove bookmark
  onRemoveBookmark(): void {
    if (!this.post.bookmarkId) {
      const userEmail = this.authService.getUserInfo().user_name;

      const subBookmark = this.bookmarkService.getAllByEmail(userEmail).subscribe(b => {
        b.map(item => {
          if (item.postId === this.post.id) {
            this.removeBookmark(item.postId);
          }
        });

        subBookmark.unsubscribe();
      });
    } else {
      this.removeBookmark(this.post.bookmarkId);
    }
  }

  removeBookmark(id) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe((x: any) => {
      if (x.code === 0) {
        this.post.isBookmark = false;

        this.snackBar.open('Bookmark removed', 'OK', {
          duration: 2000,
        });
      } else {
        this.post.isBookmark = true;

        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }

      this.cdr.markForCheck();
      bookmarkSub.unsubscribe();
    });
  }

  isIframeVideo() {
    return this.post.thumbnail.includes('iframe');
  }

  // get averave rating of the comments by postId
  getRating(comments, type): any {
    if (!comments) {
      return 0;
    }

    const len = comments.length;

    if (len === 0) {
      return 0;
    }

    let i = 0;
    let sumRating = 0;
    for ( i = 0; i < len; i++) {
      sumRating = sumRating + comments[i].rating;
    }

    const avgRating = sumRating / len;

    if (type) {
      return Math.floor(avgRating);
    }

    return avgRating.toFixed(1);
  }

  // change the format of the data
  dateFormat(date): any {
    if (date) {
      return formatDate(date, 'MMM d, y', 'en-US');
    }

    return '';
  }

  onCheckCategoryType(contentTypeId, catId: string) {
    return contentTypeId === catId ? true : false;
  }

  onShowGalleryView(i: number) {
    this.showGalleryView = true;

    const galleries = [];
    this.post.galleries.map(gallery => {
      galleries.push(gallery);
    });

    this.galleries = this.arrayMove(galleries, i, 0);

    setTimeout(() => {
      this.galleryView.nativeElement.style.top = window.scrollY + 'px';
    }, 0);
  }

  onShowVisualEssayView(i: number) {
    this.showVisualEssayView = true;

    const visualEssayImages = [];
    this.post.visualEssay.visualEssayImages.map(image => {
      visualEssayImages.push(image);
    });

    this.visualEssayImages = this.arrayMove(visualEssayImages, i, 0);

    setTimeout(() => {
      this.visualEssayView.nativeElement.style.top = window.scrollY + 'px';
    }, 0);
  }

  arrayMove(arr, fromIndex, toIndex) {
    const element = arr[fromIndex];
    arr.splice(fromIndex, 1);
    arr.splice(toIndex, 0, element);

    return arr;
  }

  returnID(object: any) {
    return object.originalID ? object.originalID : object.thumbnailID;
  }

  returnID2(object: any) {
    return object.original ? object.original : object.thumbnail;
  }

  swipe(action) {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      return;
    }

    let step;
    if (this.showGalleryView) {
      step = document.body.scrollWidth;
    } else if (this.showVisualEssayView) {
      step = document.body.scrollWidth - 210;
    }

    let index = 0;

    if (action === this.SWIPE_ACTION.LEFT) {
      if ((this.showGalleryView && this.currentIndex < this.post.galleries.length) ||
      (this.showVisualEssayView && this.currentIndex < this.post.visualEssay.visualEssayImages.length)) {
        this.currentIndex ++;
      }
    } else if (action === this.SWIPE_ACTION.RIGHT && this.currentIndex > 1) {
      this.currentIndex --;
    }

    const currentPos = this.viewContainer.nativeElement.scrollLeft;
    const timer = setInterval(() => {
      if (step - index < 10) {
        index = index + (step - index);
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
