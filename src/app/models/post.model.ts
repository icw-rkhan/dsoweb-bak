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
  date: Date;
  category: Category;
  format: string;
  bookmarked: boolean;
  bookmarkId: string;
  tags: number[];

  deserialize(data: any): Post {
    let thumbnail = data['_embedded'] ? data['_embedded']['wp\:featuredmedia'] : {};
    let category = data['_embedded'] ? data['_embedded']['wp\:term'] : {};
    const author = data['_embedded'] ? data['_embedded'].author[0] : {};

    // find category object
    category = _.flatMap(category).find(item => item['taxonomy'] === 'category');
    thumbnail = thumbnail && thumbnail[0] ? (thumbnail[0].media_details ?
      thumbnail[0].media_details.sizes.full.source_url : undefined) : undefined;

    // Remove link-more
    const cleanTextExcerpt = data.excerpt.rendered.replace(/<p[^>]* class=\"link-more\">(.*?)<\/p>/g, '');

    return <Post>Object.assign({}, {
      id: data.id,
      title: data.title.rendered,
      content: data.content.rendered,
      excerpt: cleanTextExcerpt,
      format: data.format,
      date: new Date(data.date_gmt),
      author: new Author().deserialize(author),
      thumbnail: thumbnail,
      category: new Category().deserialize(category),
      tags: data.tags,
    });
  }

}
