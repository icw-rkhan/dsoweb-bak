import { Serializable } from './serializable.model';

export class Category implements Serializable<Category> {

  id: number;
  description: string;
  link: string;
  name: string;

  deserialize(data: any): Category {
    return <Category>Object.assign({}, {
      id: data.id,
      description: data.description,
      link: data.link,
      name: data.name
    });
  }
}
