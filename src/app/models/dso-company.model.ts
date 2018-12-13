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
            id: data.resultMap.id,
            logo: data.resultMap.logo ? data.resultMap.logo : null,
            name: data.resultMap.name,
            city: data.resultMap.city ? data.resultMap.city : null,
            state: data.resultMap.state ? data.resultMap.state : null,
            media: data.resultMap.media ? data.resultMap.media : null,
            rating: data.resultMap.rating ? data.resultMap.rating : null,
            reviews: data.resultMap.reviews ? data.resultMap.reviews : null,
            address1: data.resultMap.address1 ? data.resultMap.address1 : null,
            address2: data.resultMap.address2 ? data.resultMap.address2 : null,
            zip_code: data.resultMap.zip_code ? data.resultMap.zip_code : null,
            description: data.resultMap.description ? data.resultMap.description : null
        });
    }
}
