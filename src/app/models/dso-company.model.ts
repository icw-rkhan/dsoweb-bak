import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class DSOCompany implements Serializable<DSOCompany> {
    id: string;
    logo: string;
    name: string;
    city: string;
    ceo: string;
    ceoUrl: string;
    media: string;
    state: string;
    rating: string;
    address1: string;
    address2: string;
    zip_code: string;
    description: string;
    reviewNum: number;
    recommendNum: number;
    approveNum: number;

    deserialize(data: any): DSOCompany {
        return <DSOCompany>Object.assign({}, {
            id: data.id,
            logo: data.logoURL ? data.logoURL : null,
            name: data.name,
            ceo: data.ceo ? data.ceo : null,
            ceoUrl: data.ceoUrl ? data.ceoUrl : null,
            city: data.city ? data.city : null,
            state: data.state ? data.state : null,
            media: data.media ? data.media : null,
            rating: data.rating ? data.rating : null,
            reviewNum: data.reviewNum ? data.reviewNum : 0,
            recommendNum: data.recommendNum ? data.recommendNum : 0,
            approveNum: data.approveNum ? data.approveNum : 0,
            address1: data.address1 ? data.address1 : null,
            address2: data.address2 ? data.address2 : null,
            zip_code: data.zip_code ? data.zip_code : null,
            description: data.description ? data.description : null
        });
    }
}
