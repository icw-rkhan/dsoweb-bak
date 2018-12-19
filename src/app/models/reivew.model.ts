import { Serializable } from './serializable.model';
import { formatDate } from '@angular/common';

import * as _ from 'lodash';

export class Review implements Serializable<Review> {
    id: string;
    dsoId: string;
    reviewTitle: string;
    pros: string;
    cons: string;
    rating: number;
    advice: string;
    isCurrentEmployee: boolean;
    isFormerEmployee: boolean;
    isRecommend: boolean;
    isApprove: boolean;
    reviewDate: string;
    email: string;

    // change the format of the data
    dateFormat(date: Date): any {
        if (date) {
        return formatDate(date, 'd MMM y', 'en-US');
        }

        return '';
    }

    deserialize(data: any): Review {
        return <Review>Object.assign({}, {
            id: data.id,
            dsoId: data.dsoId,
            reviewTitle: data.reviewTitle,
            pros: data.pros,
            cons: data.cons,
            rating: data.rating,
            advice: data.advice,
            isCurrentEmployee: data.isCurrentEmployee,
            isFormerEmployee: data.isFormerEmployee,
            isRecommend: data.isRecommend,
            isApprove: data.isApprove,
            email: data.email,
            reviewDate: this.dateFormat(new Date(data.reviewDate)),
        });
    }
}
