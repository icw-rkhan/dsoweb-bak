import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Company implements Serializable<Company> {
    companyId: string;
    companyName: string;
    rating: string;
    reviews: string;
    log: string;
    location: string;

    deserialize(data: any): Company {

        return <Company>Object.assign({}, {
            companyId: data.resultMap.companyId,
            companyName: data.resultMap.companyName,
            rating: data.resultMap.rating,
            reviews: data.resultMap.reviews,
            log: data.resultMap.log ? data.resultMap.log : null,
            location: data.resultMap.location ? data.resultMap.location : null,
        });
    }
}
