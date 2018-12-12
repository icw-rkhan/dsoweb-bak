import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Job implements Serializable<Job> {
    jobId: string;
    jobTitle: string;
    jobDescription: string;
    salary: string;
    companyId: string;
    companyName: string;
    location: string;
    address: string;
    log: string;
    date: string;
    mediaUrl: string;
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
            jobId: data.resultMap.jobId ? data.resultMap.jobId : null,
            jobTitle: data.resultMap.jobTitle ? data.resultMap.jobTitle : null,
            jobDescription: data.resultMap.jobDescription ? data.resultMap.jobDescription : null,
            salary: data.resultMap.salary ? data.resultMap.salary : null,
            location: data.resultMap.location ? data.resultMap.location : null,
            address: data.resultMap.address ? data.resultMap.address : null,
            companyId: data.resultMap.companyId ? data.resultMap.companyId : null,
            companyName: data.resultMap.companyName ? data.resultMap.companyName : null,
            log: data.resultMap.log ? data.resultMap.log : null,
            isAttention: data.resultMap.isAttention ? data.resultMap.isAttention : null,
            mediaUrl: data.resultMap.mediaUrl ? data.resultMap.mediaUrl : null,
            date: data.publishDate ? this.dateFormat(data.publishDate.toString()) : null
        });
    }
}
