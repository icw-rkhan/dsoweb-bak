import { Serializable } from './serializable.model';

export class Category implements Serializable<Category> {

  id: number;
  link: string;
  name: string;

  deserialize(data: any): Category {
    // Remove asterisk from the name
    const name = data.name.substring(data.name.indexOf('*') + 1);

    return <Category>Object.assign({}, {
      id: +data.id,
      link: data.link,
      name: name,
    });
  }
}
