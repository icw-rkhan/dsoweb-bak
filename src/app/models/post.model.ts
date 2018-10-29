import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

export class Post implements Serializable<Post> {

  id: string;
  email: string;
  title: string;
  content: string;
  authorId: string;
  contentTypeId: string;
  sponsorId: string;
  authorName: string;
  contentTypeName: string;
  categoryId: number;
  categoryName: string;
  sponsorName: string;
  featureMediaId: string;
  photos: string;
  videos: string;
  podcasts: string;
  bookmarkId: string;
  isBookmark: boolean;
  countOfComment: number;
  comment: string;
  date: string;
  readNumber: number;

  // change the format of the data
  dateFormat(date): any {
    if (date) {
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
      authorName: data.authorName,
      contentTypeName: data.contentTypeName,
      featureMediaId: data.featureMediaId,
      photos: data.photos,
      videos: data.videos,
      podcasts: data.podcasts,
      bookmarkId: data.bookmarkId,
      isBookmark: data.isBookmark,
      countOfComment: data.countOfComment,
      comment: data.comment,
      date: this.dateFormat(new Date(data.publishDate)),
      readNumber: data.readNumber
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
