import {Component, OnInit, OnDestroy, ViewChild, HostListener, ElementRef,
      ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { MatSnackBar, MatMenuTrigger } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
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

@Component({
  selector: 'dso-detail-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SponsorComponent implements OnInit, OnDestroy {

  post: Post;
  rate: number;
  adId: string;
  postId: string;
  authorName: string;
  authorInfo: string;
  authorAvatar: string;
  review_count: number;
  showReference: boolean;
  isAuthorVisible: boolean;
  showReferenceState: string;

  testHtml: string;

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
    private cdr: ChangeDetectorRef,
    private postService: PostService,
    private authService: AuthService,
    private commentService: CommentService,
    private bookmarkService: BookmarkService) {

    this.rate = 0;
    this.review_count = 0;
    this.isAuthorVisible = false;
    this.showReferenceState = 'Show more';
    this.showReference = false;

    this.post = new Post();
  }

  // gets the postId from article page and gets the postInfo and the commentInfo with postId from server
  ngOnInit(): void {
    this.paramsSub = this.route.params.subscribe(params => {
      this.progress.start();
      this.postId = params['id'];

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
        temp.content = this.changePreToDiv(temp.content);
        temp.content = this.setDropcap(temp.content);
        temp.content = this.modifyADs(temp.content);

        this.post = temp;

        const element = this.postContent.nativeElement;
        const fragment = document.createRange().createContextualFragment(this.post.content);
        element.appendChild(fragment);

        if (this.postContent.nativeElement.innerHTML !== '') {
          setTimeout(() => {
            this.changeLayoutOfPost();
            this.fetchAuthorInfo();

            this.cdr.markForCheck();
          }, 0);
        }

        postSub.unsubscribe();
      },
      err => {
        this.progress.complete();
        postSub.unsubscribe();
      });
    });
  }

  modifyADs(html: string) {
    const matchId = html.match(/(id="placement.[^)]*._)/g);
    if (matchId && matchId.length > 0) {
      this.adId = matchId[0].replace('id="', '');
      this.adId = `${this.adId}0`;
    }

    const matchAD = html.match(/<p>.*\n<script/g);
    if (this.adId && matchAD && matchAD.length > 0) {
      let t = matchAD[0];
      t = t.replace('<p>', `<p id="${this.adId}">`);

      html = html.replace(/<p>.*\n<script/, t);
    } else {
      const matchADh = html.match(/<h2>.*\n<script/g);
      if (this.adId && matchADh && matchADh.length > 0) {
        let t = matchADh[0];
        t = t.replace('<h2>', `<h2 id="${this.adId}">`);

        html = html.replace(/<h2>.*\n<script/, t);
      }
    }

    html = html.replace(/(document.write[^)]*.);/g, '');

    return html;
  }

  setDropcap(html: string) {
    const matches = html.match(/(<p[^>]*>.*?<\/p>)/g);
    const first = matches[0];

    let content = html;
    if (first === '<p>&nbsp;</p>' || first.includes('(By By')) {
      content = content.replace(first, '');
    }

    content = content.replace(/(<p[^>]*>((?!iframe)(?!&nbsp).)*<\/p>)/, '<div class="first-big">$1</div>');
    html = content.replace(/(<p[^>]*><span[^>]*>.*?<\/span><\/p>)/, '<div class="first-big">$1</div>');

    return html;
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
    // this.reLayout('a');
    this.reLayout('div');
    this.reLayout('table');
    this.reLayout('figcaption');
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
          case 'a':
            let url = tag[i].getAttribute('href');

            if (url && url.includes('wp.dsodentist.com')) {
              tag[i].style.color = '#879aa8';
              // if the href of the 'a' tag contains 'wp.dsodentist.com', remove the href
              tag[i].removeAttribute('href');

              let header_url;
              if (url.includes('http://')) {
                header_url = 'http://';

              } else if (url.includes('https://')) {
                header_url = 'https://';
              }

              url  = url.replace(`${header_url}wp.dsodentist.com/`, '');
              url = `/detail/sponsor/${this.postId}/${url}`;

              tag[i].addEventListener('click', () => {
                this.router.navigate([url]);
              });
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
    this.authorAvatar = this.post.authorPhotoUrl;
    this.authorName = this.post.authorName;
    this.authorInfo = this.post.authorDetails;

    this.activeAuthorLayout();
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

  // get average rating of the comments by postId
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

  onCheckCategoryType(contentTypeId, catId: string) {
    return contentTypeId === catId ? true : false;
  }
}
