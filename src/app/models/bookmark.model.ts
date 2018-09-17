import { Serializable } from './serializable.model';

export class Bookmark implements Serializable<Bookmark> {

  create_time?: string;
  email: string;
  id?: string;
  title: string;
  post_id: string;
  user_id?: string;

  deserialize(data: any): Bookmark {
    return <Bookmark>Object.assign({}, {
      create_time: data.create_time,
      email: data.email,
      id: data.id,
      title: data.title,
      post_id: data.post_id,
      user_id: data.user_id
    });
  }
}
