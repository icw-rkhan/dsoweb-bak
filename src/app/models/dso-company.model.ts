import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class DSOCompany implements Serializable<DSOCompany> {
    id: string;
    logo: string;
    name: string;
    city: string;
    media: string;
    state: string;
    rating: string;
    reviews: string;
    address1: string;
    address2: string;
    zip_code: string;
    description: string;

    deserialize(data: any): DSOCompany {
        return <DSOCompany>Object.assign({}, {
            id: data.id,
            logo: data.logoURL ? data.logoURL : null,
            name: data.name,
            city: data.city ? data.city : null,
            state: data.state ? data.state : null,
            media: data.media ? data.media : null,
            rating: data.rating ? data.rating : null,
            reviews: data.reviewNum ? data.reviewNum : '0',
            address1: data.address1 ? data.address1 : null,
            address2: data.address2 ? data.address2 : null,
            zip_code: data.zip_code ? data.zip_code : null,
            description: data.description ? data.description : null
        });
    }
}
