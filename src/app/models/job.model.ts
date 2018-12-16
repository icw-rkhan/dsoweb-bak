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
            id: data.id,
            logoURL: data.logoURL,
            jobTitle: data.jobTitle,
            companyId: data.companyId,
            companyName: data.company,
            jobDescription: data.jobDescription,
            salaryStartingValue: data.salaryStartingValue,
            salaryEndValue: data.salaryEndValue,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            position: data.position,
            isAttention: data.isAttention,
            publishDate: this.dateFormat(data.publishDate.toString())
        });
    }
}
