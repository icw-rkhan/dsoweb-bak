import { Serializable } from './serializable.model';
import { formatDate } from '@angular/common';

import * as _ from 'lodash';

export class Review implements Serializable<Review> {
    reviewTitle: string;
    pros: string;
    cons: string;
    recommend: string;
    isCurrentEmployee: boolean;
    isFormerEmployee: boolean;
    isRecommend: boolean;
    isApprove: boolean;
    reviewDate: string;

    // change the format of the data
    dateFormat(date: string): any {
        if (date) {
        date = date.replace(/-/g, '/');

        return formatDate(date, 'MMM d, y', 'en-US');
        }

        return '';
    }

    deserialize(data: any): Review {
        return <Review>Object.assign({}, {
            reviewTitle: data.resultMap.reviewTitle ? data.resultMap.reviewTitle : null,
            pros: data.resultMap.pros ? data.resultMap.pros : null,
            cons: data.resultMap.cons ? data.resultMap.cons : null,
            recommend: data.resultMap.recommend ? data.resultMap.recommend : null,
            isCurrentEmployee: data.resultMap.isCurrentEmployee ? data.resultMap.isCurrentEmployee : false,
            isFormerEmployee: data.resultMap.isFormerEmployee ? data.resultMap.isFormerEmployee : false,
            isRecommend: data.resultMap.isRecommend ? data.resultMap.isRecommend : false,
            isApprove: data.resultMap.isApprove ? data.resultMap.isApprove : false,
            reviewDate: data.resultMap.reviewDate ? this.dateFormat(data.resultMap.reviewDate.toString()) : null,
        });
    }
}
