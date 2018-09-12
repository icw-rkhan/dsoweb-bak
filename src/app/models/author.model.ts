import { Serializable } from './serializable.model';

export class Author implements Serializable<Author> {

  id: number;
  name: string;
  url: string;
  description: string;

  deserialize(data: any): Author {
    return <Author>Object.assign({}, {
      id: data.id,
      name: data.name,
      url: data.url,
      description: data.description
    });
  }

}
