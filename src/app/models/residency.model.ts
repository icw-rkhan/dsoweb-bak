import { Serializable } from './serializable.model';

export class Residency implements Serializable<Residency> {

  id: number;
  name: string;
  year?: number;

  deserialize(data: any): Residency {
    if (data.year) {
      return <Residency>Object.assign({}, {
        id: data.id,
        name: data.name,
        year: data.year
      });
    }
    return <Residency>Object.assign({}, {
      id: data.id,
      name: data.name
    });
  }
}
