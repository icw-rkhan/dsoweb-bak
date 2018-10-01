import { Author } from './author.model';
import { Serializable } from './serializable.model';
import { Category } from './category.model';
import * as _ from 'lodash';

export class Post implements Serializable<Post> {

  id: number;
  title: string;
  content: string;
  excerpt: string;
  author: Author;
  thumbnail: string;
  link: string;
  date: Date;
  categories: Category[];
  format: string;
  bookmarked: boolean;
  bookmarkId: string;
  tags: number[];

  deserialize(data: any): Post {
    let thumbnailObj = data['_embedded'] && data['_embedded']['wp\:featuredmedia'] ? data['_embedded']['wp\:featuredmedia'] : {};
    const categoryObj = data['_embedded'] ? data['_embedded']['wp\:term'] : {};
    const authorObj = data['_embedded'] ? data['_embedded'].author[0] : {};

    // find category object
    const categories = [];
    _.flatMap(categoryObj)
      .filter(item => item['taxonomy'] === 'category')
      .forEach(c =>
        categories.push(new Category().deserialize(c))
      );

    const category = [];
    if (categories.length > 1) {
      category.push(categories[1]);
    } else {
      category.push(categories[0]);
    }
    thumbnailObj = thumbnailObj && thumbnailObj[0] ? (thumbnailObj[0].media_details &&
      thumbnailObj[0].media_details.sizes && thumbnailObj[0].media_details.sizes.full ?
      thumbnailObj[0].media_details.sizes.full.source_url : undefined) : undefined;

    // Remove link-more
    const cleanTextExcerpt = data.excerpt.rendered.replace(/<p[^>]* class=\"link-more\">(.*?)<\/p>/g, '');

    return <Post>Object.assign({}, {
      id: data.id,
      title: unescape(escape(data.title.rendered)),
      content: data.content.rendered,
      excerpt: cleanTextExcerpt,
      format: data.format,
      date: new Date(data.date_gmt),
      author: new Author().deserialize(authorObj),
      thumbnail: thumbnailObj,
      link: data.link,
      categories: category,
      tags: data.tags,
    });
  }

}

export class PostArgs {
  page: number;
  per_page: number;
  type?: string;
  categoryId?: number;
  sponsorId?: number;
}
