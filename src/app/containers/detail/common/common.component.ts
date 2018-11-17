import {Component, OnInit, OnDestroy, ViewChild, HostListener,
               ElementRef, AfterViewChecked } from '@angular/core';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NgProgress } from '@ngx-progressbar/core';
import { formatDate } from '@angular/common';
import { Subscription } from 'rxjs';

import { BookmarkService } from '../../../services/bookmark.service';
import { CommentService } from '../../../services/comment.service';
import { PostService } from '../../../services/post.service';
import { AuthService } from '../../../services';

import { Bookmark } from '../../../models/bookmark.model';
import { Comment } from '../../../models/comment.model';
import { Post } from '../../../models/post.model';
import { environment } from '../../../../environments/environment';
import { SharingService } from '../../../services/sharing.service';

@Component({
  selector: 'dso-detail-common',
  templateUrl: './common.component.html',
  styleUrls: ['./common.component.scss']
})
export class CommonComponent implements OnInit, AfterViewChecked, OnDestroy {

  post: Post;
  rate: number;
  postId: string;
  authorName: string;
  authorInfo: string;
  review_count: number;
  postRendered: boolean;
  showReference: boolean;
  isAuthorVisible: boolean;
  postSafeContent: SafeHtml;
  showReferenceState: string;

  comments: Comment[];

  paramsSub: Subscription;

  rateList = [
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'},
    {status: 'inactive'}
  ];

  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  @ViewChild('postContent') postContent: ElementRef;
  @ViewChild('authorContent') authorContent: ElementRef;

  constructor(
    private router: Router,
    private progress: NgProgress,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private sanitizer: DomSanitizer,
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService) {

    this.rate = 0;
    this.review_count = 0;
    this.isAuthorVisible = false;
    this.showReferenceState = 'Show more';
    this.showReference = false;
    this.postRendered = false;
    this.postSafeContent = '';

    this.post = new Post();
  }

  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];

      // add ADS code to the specifi post
      this.addADSCodeTo(this.postId);

      const commentSub = this.commentService.comments(this.postId).subscribe(c => {
        this.comments = c;

        commentSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        commentSub.unsubscribe();
      });

      const postSub = this.postService.fetchById(this.postId).subscribe(p => {
        this.post = p;

        if (this.post.content) {
          this.setDropcap();

          // change Pre tag to Div tag
        this.postSafeContent = this.sanitizeHTML(this.changePreToDiv(p.content));
        }

        this.progress.complete();
        postSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        postSub.unsubscribe();
      });
    },
    err => {
      this.progress.complete();
    });
  }

  addADSCodeTo(id: string) {
    if (id === environment.ADS_POST_ID) {
      const script1 = document.createElement('script');
      script1.setAttribute('class', 'ads_script');
      script1.setAttribute('async', '');
      script1.setAttribute('src', '//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js');

      const script2 = document.createElement('script');
      script2.setAttribute('class', 'ads_script');
      script2.innerHTML = '(adsbygoogle = window.adsbygoogle || []) .push (' +
        '{ google_ad_client: "ca-pub-5793099538711899", enable_page_level_ads: true });';

      document.head.appendChild(script1);
      document.head.appendChild(script2);
    }
  }

  setDropcap(): void {
    const matches = this.post.content.match(/(<p[^>]*>.*?<\/p>)/g);
    const first = matches[0];

    let content = this.post.content;
    if (first === '<p>&nbsp;</p>' || first.includes('(By By')) {
      content = content.replace(first, '');
    }

    content = content.replace(/(<p[^>]*>((?!iframe)(?!&nbsp).)*<\/p>)/, '<div class="first-big">$1</div>');
    this.post.content = content.replace(/(<p[^>]*><span[^>]*>.*?<\/span><\/p>)/, '<div class="first-big">$1</div>');
  }

  ngAfterViewChecked(): void {
    if (this.postContent.nativeElement.innerHTML !== '' && !this.postRendered) {
      this.postRendered = true;

      setTimeout(() => {
       this.changeLayoutOfPost();
       this.fetchAuthorInfo();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    this.paramsSub.unsubscribe();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.trigger.closeMenu();
  }

  @HostListener('window:resize', [])
  onresize() {
    this.reLayout('div');
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

  // fetch an author/speaker's name
  fetchAuthorInfo() {
    this.authorName = this.post.authorName;
    this.authorInfo = this.post.authorDetails;

    this.activeAuthorLayout();
  }

  sanitizeHTML(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
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

      // if (!this.authorName.includes('DSODentist')) {
      //   this.authorContent.nativeElement.style.display = 'none';
      // } else {
      //   this.authorName = '';
      // }

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

      bookmarkSub.unsubscribe();
    });
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
}
