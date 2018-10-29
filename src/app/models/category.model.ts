import { Serializable } from './serializable.model';

export class Category implements Serializable<Category> {

  id: string;
  link?: string;
  name: string;

  deserialize(data: any): Category {

    return <Category>Object.assign({}, {
      id: data.id,
      name: data.name,
    });
  }
}
