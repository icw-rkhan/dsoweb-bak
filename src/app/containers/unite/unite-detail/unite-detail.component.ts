import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../../models/post.model';
import { NgProgress } from '@ngx-progressbar/core';
import { MatSnackBar } from '@angular/material';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { AuthService } from '../../../services';
import { BookmarkService } from '../../../services/bookmark.service';

import { Bookmark } from '../../../models/bookmark.model';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'dso-unite-detail',
  templateUrl: './unite-detail.component.html',
  styleUrls: ['./unite-detail.component.scss']
})
export class UniteDetailComponent implements OnInit, AfterViewChecked {

  article: Post;
  postRendered: boolean;
  showReference: boolean;
  postSafeContent: SafeHtml;
  showReferenceState: string;

  @ViewChild('postContent') postContent: ElementRef;

  constructor(
    private progress: NgProgress,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private authService: AuthService,
    private postService: PostService,
    private bookmarkService: BookmarkService) {
      this.postRendered = false;
      this.showReferenceState = 'Show more';

      this.progress.start();

      this.route.params.subscribe(params => {
        const id = params['id'];

        const uniteSub = this.postService.fetchById(id).subscribe(post => {
          this.article = post;

          if (this.article.content) {
            this.setDropcap();

            // change Pre tag to Div tag
            this.postSafeContent = this.sanitizeHTML(this.changePreToDiv(this.article.content));
          }

          this.progress.complete();
          uniteSub.unsubscribe();
        });
      });
  }

  ngOnInit() {}

  ngAfterViewChecked(): void {
    if (this.postContent && this.postContent.nativeElement.innerHTML !== '' && !this.postRendered) {
      this.postRendered = true;

      setTimeout(() => {
       this.changeLayoutOfPost();
      }, 0);
    }
  }

  // add bookmark
  onAddBookmark(): void {
    const userEmail = this.authService.getUserInfo().user_name;

    const bookmarkSub = this.bookmarkService.saveBookmark(<Bookmark>{
      email: userEmail,
      title: this.article.title,
      postId: this.article.id.toString(),
      categoryId: this.article.categoryId.toString(),
      contentTypeId: this.article.contentTypeId,
      url: 'http://www.dsodentist.com',
      status: '1'
    }).subscribe((x: any) => {
      if (x.code === 0) {
        this.article.isBookmark = true;

        this.snackBar.open('Bookmark added', 'OK', {
          duration: 2000,
        });
      } else {
        this.article.isBookmark = false;

        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }

      bookmarkSub.unsubscribe();
    });
  }

  // remove bookmark
  onRemoveBookmark(): void {
    if (!this.article.bookmarkId) {
      const userEmail = this.authService.getUserInfo().user_name;

      const subBookmark = this.bookmarkService.getAllByEmail(userEmail).subscribe(b => {
        b.map(item => {
          if (item.postId === this.article.id) {
            this.removeBookmark(item.postId);
          }
        });

        subBookmark.unsubscribe();
      });
    } else {
      this.removeBookmark(this.article.bookmarkId);
    }
  }

  removeBookmark(id) {
    const bookmarkSub = this.bookmarkService.deleteOneById(id).subscribe((x: any) => {
      if (x.code === 0) {
        this.article.isBookmark = false;

        this.snackBar.open('Bookmark removed', 'OK', {
          duration: 2000,
        });
      } else {
        this.article.isBookmark = true;

        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }

      bookmarkSub.unsubscribe();
    });
  }

  @HostListener('window:resize', [])
  onresize() {
    this.reLayout('div');
  }

  sanitizeHTML(html) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

    // change Pre tag to Div tag
  changePreToDiv(html) {
    html = html.toString();

    html = html.replace(/<pre>/g, '<div><p>“</p><p>');
    html = html.replace(/<\/pre>/g, '</p></div>');

    return html;
  }

  setDropcap(): void {
    const matches = this.article.content.match(/(<p[^>]*>.*?<\/p>)/g);
    const first = matches[0];

    let content = this.article.content;
    if (first === '<p>&nbsp;</p>' || first.includes('(By By')) {
      content = content.replace(first, '');
    }

    content = content.replace(/(<p[^>]*>((?!iframe)(?!&nbsp).)*<\/p>)/, '<div class="first-big">$1</div>');
    this.article.content = content.replace(/(<p[^>]*><span[^>]*>.*?<\/span><\/p>)/, '<div class="first-big">$1</div>');
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
}
