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
    log: string;
    date: string;
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
            jobId: data.resultMap.jobId,
            jobTitle: data.resultMap.jobTitle,
            jobDescription: data.resultMap.jobDescription,
            salary: data.resultMap.salary,
            companyId: data.resultMap.companyId,
            companyName: data.resultMap.companyName,
            log: data.resultMap.log ? data.resultMap.log : null,
            isAttention: data.resultMap.isAttention,
            date: this.dateFormat(data.publishDate.toString())
        });
    }
}
