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
    let thumbnail = data['_embedded']['wp\:featuredmedia'];
    let category = data['_embedded']['wp\:term'];

    // find category object
    category = _.flatMap(category).find(item => item['taxonomy'] === 'category');
    thumbnail = thumbnail !== undefined ? (thumbnail[0].media_details ?
      thumbnail[0].media_details.sizes.full.source_url : undefined) : undefined;

    return <Post>Object.assign({}, {
      id: data.id,
      title: data.title.rendered,
      content: data.content.rendered,
      excerpt: data.excerpt.rendered,
      format: data.format,
      date: new Date(data.date_gmt),
      author: new Author().deserialize(data._embedded.author[0]),
      thumbnail: thumbnail,
      category: new Category().deserialize(category),
      tags: data.tags,
    });
  }

}
