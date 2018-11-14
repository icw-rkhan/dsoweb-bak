import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import { environment } from '../../environments/environment';

export class Post implements Serializable<Post> {

  id: string;
  email: string;
  title: string;
  content: string;
  authorId: string;
  contentTypeId: string;
  sponsorId: string;
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

  constructor() {}

  // change the format of the data
  dateFormat(date: string): any {
    if (date) {
      date = date.replace(/-/g, '/');
      return formatDate(date, 'MMM d, y', 'en-US');
    }

    return '';
  }

  deserialize(data: any): Post {

    return <Post>Object.assign({}, {
      id: data.id,
      email: data.email,
      title: data.title,
      content: data.content,
      authorId: data.authorId,
      contentTypeId: data.contentTypeId,
      categoryId: data.categoryId,
      categoryName: data.categoryName,
      sponsorId: data.sponsorId,
      sponsorName: data.sponsorName,
      authorName: data.author.fullName,
      authorDetails: data.author.authorDetails,
      contentTypeName: data.contentTypeName,
      featuredMediaId: data.featuredMediaId,
      bookmarkId: data.bookmarkId,
      isBookmark: data.isBookmark,
      excerpt: data.excerpt,
      thumbnail: data.featuredMedia.code.thumbnailUrl,
      date: this.dateFormat(data.publishDate)
    });
  }

}

export class PostArgs {
  page: number;
  per_page: number;
  type?: number;
  categoryId?: number;
  sponsorId?: number;
}
