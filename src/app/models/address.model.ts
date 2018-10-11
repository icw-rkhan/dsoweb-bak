import { Serializable } from './serializable.model';

export class Address implements Serializable<Address> {

  address1: string;
  address2: string;
  zipCode: string;
  city: string;
  states: string;

  constructor() {
    this.address1 = '';
    this.address2 = '';
    this.zipCode = '';
    this.city = '';
    this.states = '';
  }

  deserialize(data: any): Address {
    return <Address>Object.assign({}, {
      address1: data.address1,
      address2: data.address2,
      zipCode: data.zipCode,
      city: data.city,
      states: data.states
    });
  }

}
