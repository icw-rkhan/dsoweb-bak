import { Serializable } from './serializable.model';

export class Bookmark implements Serializable<Bookmark> {
  create_time?: string;
  email: string;
  id?: string;
  title: string;
  url: string;
  user_id?: string;

  deserialize(data: any): Bookmark {
    return <Bookmark>Object.assign({}, {
      create_time: data.create_time,
      email: data.email,
      id: data.id,
      title: data.title,
      url: data.url,
      user_id: data.user_id
    });
  }
}
