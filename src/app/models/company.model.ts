import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Company implements Serializable<Company> {
    companyId: string;
    companyName: string;
    rating: string;
    reviews: string;
    log: string;
    mediaUrl: string;
    location: string;
    address: string;
    companyDesc: string;

    deserialize(data: any): Company {
        return <Company>Object.assign({}, {
            companyId: data.resultMap.companyId ? data.resultMap.companyId : null,
            companyName: data.resultMap.companyName ? data.resultMap.companyName : null,
            rating: data.resultMap.rating ? data.resultMap.rating : null,
            reviews: data.resultMap.reviews ? data.resultMap.reviews : null,
            log: data.resultMap.log ? data.resultMap.log : null,
            address: data.resultMap.address ? data.resultMap.address : null,
            mediaUrl: data.resultMap.mediaUrl ? data.resultMap.mediaUrl : null,
            companyDesc: data.resultMap.companyDesc ? data.resultMap.companyDesc : null,
            location: data.resultMap.location ? data.resultMap.location : null,
        });
    }
}
