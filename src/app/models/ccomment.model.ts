import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class CComment implements Serializable<CComment> {
    companyId: string;
    companyName: string;
    rating: string;
    reviews: string;

    deserialize(data: any): CComment {

        return <CComment>Object.assign({}, {
            companyId: data.resultMap.companyId,
            companyName: data.resultMap.companyName,
            rating: data.resultMap.rating,
            reviews: data.resultMap.reviews
        });
    }
}
