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
    companyDes: string;
    salaryStartingValue: string;
    salaryEndValue: string;
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: boolean;
    position: any;
    person: string;
    stage: string;
    employees: string;
    foundation: string;
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
            logoURL: data.dso.logoURL,
            jobTitle: data.jobTitle,
            companyId: data.dso.id,
            companyName: data.dso.name,
            jobDescription: data.jobDescription,
            salaryStartingValue: data.salaryStartingValue,
            salaryEndValue: data.salaryEndValue,
            address1: data.address1,
            address2: data.address2,
            city: data.city,
            state: data.state,
            zipCode: data.zipCode,
            person: data.person,
            employees: data.dso.employees,
            stage: data.dso.stage,
            companyDes: data.dso.description,
            foundation: data.dso.year_of_foundation,
            position: data.position.coordinates,
            isAttention: data.isAttention,
            publishDate: this.dateFormat(data.publishEnd.toString())
        });
    }
}
