import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Job implements Serializable<Job> {
    id: string;
    logoURL: string;
    jobTitle: string;
    companyId: string;
    companyName: string;
    jobDescription: string;
    salaryStartingValue: string;
    salaryEndValue: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: boolean;
    position: boolean;
    publishDate: string;
    isSaved: boolean;
    isAttention: boolean;

    // change the format of the data
    dateFormat(date: string): any {
        if (date) {
        date = date.replace(/-/g, '/');

        return formatDate(date, 'MMM d, y', 'en-US');
        }

        return '';
    }

    deserialize(data: any): Job {
        return <Job>Object.assign({}, {
            id: data.resultMap.id,
            logoURL: data.resultMap.logoURL,
            jobTitle: data.resultMap.jobTitle,
            companyId: data.resultMap.companyId,
            companyName: data.resultMap.company,
            jobDescription: data.resultMap.jobDescription,
            salaryStartingValue: data.resultMap.salaryStartingValue,
            salaryEndValue: data.resultMap.salaryEndValue,
            address1: data.resultMap.address1,
            address2: data.resultMap.address2,
            city: data.resultMap.city,
            state: data.resultMap.state,
            zipCode: data.resultMap.zipCode,
            position: data.resultMap.position,
            isAttention: data.resultMap.isAttention,
            publishDate: this.dateFormat(data.resultMap.publishDate.toString())
        });
    }
}
