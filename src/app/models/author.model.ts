import { Serializable } from './serializable.model';

export class Author implements Serializable<Author> {

  id: number;
  name: string;
  sort: number;
  email: string;
  role: string;
  cellPhone: number;
  details: string;
  objectId: any;

  makeAuthorName(firstName, lastName, role) {
    return `${firstName} ${lastName}, ${role}`;
  }

  deserialize(data: any): Author {
    return <Author>Object.assign({}, {
      id: data._id,
      sort: data.sort,
      email: data.email,
      cellPhone: data.cellPhone,
      name: this.makeAuthorName(data.firstName, data.lastName, data.role),
      details: data.authorDetails,
      objectId: data.objectId
    });
  }

}
