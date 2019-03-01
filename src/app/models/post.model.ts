import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import { environment } from '../../environments/environment';

export class Post implements Serializable<Post> {

  id: string;
  email: string;
  title: string;
  subTitle: string;
  content: string;
  authorId: string;
  contentTypeId: string;
  sponsorId: string;
  authorPhotoUrl: string;
  authorName: string;
  authorDetails: string;
  contentTypeName: string;
  categoryId: number;
  categoryName: string;
  sponsorName: string;
  featuredMediaId: string;
  bookmarkId: string;
  isBookmark: boolean;
  date: string;
  excerpt: string;
  thumbnail?: string;
  link: string;
  relativeTopics: any;
  references: any;
  galleries: any[];
  visualEssays: any[];
  isFeatured: boolean;

  constructor() {}

  // change the format of the data
  dateFormat(date: string): any {
    if (date) {
      date = date.replace(/-/g, '/');

      return formatDate(date, 'MMM d, y', 'en-US');
    }

    return '';
  }

  getThumbnailUrl(id: string) {
    return `${environment.cmsAPIUrl}/file/downloadFileByObjectId?objectId=${id}`;
  }

  deserialize(data: any): Post {
    return <Post>Object.assign({}, {
      id: data.id,
      email: data.email,
      title: data.title,
      subTitle: data.subTitle ? data.subTitle : null,
      content: data.content ? data.content : '',
      authorId: data.authorId,
      contentTypeId: data.contentTypeId,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      sponsorId: data.sponsorId,
      sponsorName: data.sponsorName,
      authorPhotoUrl: data.authorPhotoUrl ? data.authorPhotoUrl : '',
      authorName: data.author ? data.author.fullName : '',
      authorDetails: data.author ? data.author.authorDetails : '',
      contentTypeName: data.contentTypeName,
      featuredMediaId: data.featuredMediaId,
      bookmarkId: data.bookmarkId,
      isBookmark: data.isBookmark,
      galleries: data.photos,
      visualEssays: data.visualEssays,
      excerpt: data.excerpt ? data.excerpt : '',
      thumbnail: data.featuredMedia ? this.getThumbnailUrl(data.featuredMedia.code.thumbnail) : '',
      date: this.dateFormat(data.publishDate.toString()),
      link: 'https://www.dsodentist.com',
      isFeatured: data.isFeatured,
      relativeTopics: data.relativeTopicList,
      references: data.references
    });
  }

}

export class PostArgs {
  page: number;
  per_page: number;
  type?: number;
  categoryId?: number;
  sponsorId?: number;
  authorId?: string;
  isFeatured?: boolean;
}
