import { Author } from './author.model';
import { Serializable } from './serializable.model';

export class Post implements Serializable<Post> {

  title: string;
  content: string;
  excerpt: string;
  author: Author;
  thumbnail: string;
  date: Date;

  deserialize(data: any): Post {
    const media = data['_embedded']['wp\:featuredmedia'];

    return <Post>Object.assign({}, {
      title: data.title.rendered,
      content: data.content.rendered,
      excerpt: data.excerpt.rendered,
      date: new Date(data.date_gmt),
      author: new Author().deserialize(data._embedded.author[0]),
      thumbnail: media ? media[0]['source_url'] : undefined
    });
  }

}
