import { Component, OnInit, HostListener, Input, ChangeDetectionStrategy,
  ChangeDetectorRef, ElementRef, ViewChild, EventEmitter, AfterContentChecked, Output } from '@angular/core';

import { Post } from '../../../models/post.model';
import { Bookmark } from '../../../models/bookmark.model';

import { AuthService } from '../../../services';
import { BookmarkService } from '../../../services/bookmark.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'dso-detail-card',
  templateUrl: './detail-card.component.html',
  styleUrls: ['./detail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailCardComponent implements OnInit, AfterContentChecked {

  @Input() article: Post;
  @Input() index: number;

  @Output() scrollEvent = new EventEmitter();

  id: string;
  isAD: boolean;
  isLoaded: boolean;
  isRendered: boolean;
  postRendered: boolean;
  showReference: boolean;
  showReferenceState: string;

  @ViewChild('viewContainer') viewContainer: ElementRef;

  SWIPE_ACTION = {UP: 'swipeup', DOWN: 'swipedown'};

  constructor(
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private authService: AuthService,
    private bookmarkService: BookmarkService) {
      this.isAD = false;
      this.isLoaded = false;
      this.isRendered = false;
      this.postRendered = false;

      this.showReferenceState = 'Show more';
  }

  ngOnInit() {
    const title = this.article.title;

    if (title.length > 2 && title.substr(0, 2) === 'AD') {
      this.isAD = true;
      this.article.title = ' ';
    } else {
      this.isAD = false;
    }

    this.id = `postContent${this.index}`;

    if (this.article.content) {
      this.changePreToDiv();
      this.setDropcap();
    }

    this.isLoaded = true;
  }

  ngAfterContentChecked() {
    if (document.getElementById(this.id) && !this.isRendered) {
      this.changeLayoutOfPost();

      this.cdr.markForCheck();
    }
  }

  // add bookmark
  onAddBookmark(article: Post): void {
    const userEmail = this.authService.getUserInfo().user_name;

    const bookmarkSub = this.bookmarkService.saveBookmark(<Bookmark>{
      email: userEmail,
      title: article.title,
      postId: article.id.toString(),
      categoryId: article.categoryId.toString(),
      contentTypeId: article.contentTypeId,
      url: 'http://www.dsodentist.com',
      status: '1'
    }).subscribe((x: any) => {
      if (x.code === 0) {
        article.isBookmark = true;

        this.snackBar.open('Bookmark added', 'OK', {
          duration: 2000,
        });
      } else {
        article.isBookmark = false;

        this.snackBar.open('Bookmark failed', 'OK', {
          duration: 2000,
        });
      }

      this.cdr.markForCheck();
      bookmarkSub.unsubscribe();
    });
  }

  // remove bookmark
  onRemoveBookmark(article: Post): void {
    if (!article.bookmarkId) {
      const userEmail = this.authService.getUserInfo().user_name;

      const subBookmark = this.bookmarkService.getAllByEmail(userEmail).subscribe(b => {
        b.map(item => {
          if (item.postId === article.id) {
            this.removeBookmark(item.postId);
          }
        });

        subBookmark.unsubscribe();
      });
    } else {
      this.removeBookmark(article.bookmarkId);
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

      this.cdr.markForCheck();
      bookmarkSub.unsubscribe();
    });
  }

  @HostListener('window:resize', [])
  onresize() {
    this.reLayout('div');
  }

  // change Pre tag to Div tag
  changePreToDiv(): void {
    let content = this.article.content;

    content = content.replace(/<pre>/g, '<div><p>“</p><p>');
    content = content.replace(/<\/pre>/g, '</p></div>');

    this.article.content = content;
  }

  setDropcap(): void {
    const matches = this.article.content.match(/(<p[^>]*>.*?<\/p>)/g);
    const first = matches[0];

    let content = this.article.content;
    if (first === '<p>&nbsp;</p>' || first.includes('(By By')) {
      content = content.replace(first, '');
    }

    this.article.content = content.replace(/(<p[^>]*>((?!iframe).)*<\/p>)/, '<div class="first-big">$1</div>');

    if (!this.article.content.includes('<div class="first-big">')) {
      this.article.content = content.replace(/(<p[^>]*><span[^>]*>.*?<\/span><\/p>)/, '<div class="first-big">$1</div>');
    }
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
    const parentTag = document.getElementById(this.id);
    const tag = parentTag.getElementsByTagName(tagName);
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
                }, 0);
              } else {
                setTimeout(() => {
                  this.showReference = false;
                }, 0);
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

      this.isRendered = true;
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
    const parentTag = document.getElementById(this.id);
    const reference = parentTag.getElementsByTagName('ol')[0];
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

  isNullThumbnail(url: string) {
    if (url) {
      if (url.includes('objectId=null')) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  swipe(action) {
    const stepY = window.screen.height * 0.7;
    let index = 0;

    const currentPosY = this.viewContainer.nativeElement.scrollTop;
    const timer = setInterval(() => {
      if (stepY - index < 10) {
        index ++;
      } else {
        index = index + 10;
      }

      if (action === this.SWIPE_ACTION.UP) {
        this.viewContainer.nativeElement.scrollTo(0, currentPosY + index);
      } else {
        this.viewContainer.nativeElement.scrollTo(0, currentPosY - index);
      }

      if (index >= stepY) {
        clearInterval(timer);
      }
    }, 0);
  }
}

