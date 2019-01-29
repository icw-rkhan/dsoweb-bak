import { Serializable } from './serializable.model';

export class ContentType implements Serializable<ContentType> {

  id: string;
  name: string;
  sort: number;

  deserialize(data: any): ContentType {
    return <ContentType>Object.assign({}, {
        id: data.id,
        name: data.name,
        sort: data.sort
    });
  }

}
