import { Author } from './author.model';
import { Serializable } from './serializable.model';
import { Category } from './category.model';
import * as _ from 'lodash';

export class Post implements Serializable<Post> {

  title: string;
  content: string;
  excerpt: string;
  author: Author;
  thumbnail: string;
  date: Date;
  category: Category;
  format: string;

  deserialize(data: any): Post {
    const media = data['_embedded']['wp\:featuredmedia'];
    let category = data['_embedded']['wp\:term'];

    // find category object
    category = _.flatMap(category).find(item => item['taxonomy'] === 'category');

    return <Post>Object.assign({}, {
      title: data.title.rendered,
      content: data.content.rendered,
      excerpt: data.excerpt.rendered,
      format: data.format,
      date: new Date(data.date_gmt),
      author: new Author().deserialize(data._embedded.author[0]),
      thumbnail: media ? media[0]['source_url'] : undefined,
      category: new Category().deserialize(category),
    });
  }

}
