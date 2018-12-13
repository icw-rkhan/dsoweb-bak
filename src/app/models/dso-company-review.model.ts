import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class DSOCompanyReview implements Serializable<DSOCompanyReview> {
    rating: string;
    reviewNum: string;
    recommendNum: string;
    approveNum: string;
    reviews: any;

    deserialize(data: any): DSOCompanyReview {
        return <DSOCompanyReview>Object.assign({}, {
            rating: data.resultMap.rating,
            reviewNum: data.resultMap.reviewNum,
            recommendNum: data.resultMap.recommendNum,
            approveNum: data.resultMap.approveNum,
            reviews: data.resultMap.reviews
        });
    }
}
