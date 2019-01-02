import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Job implements Serializable<Job> {
    id: string;
    logoURL: string;
    jobTitle: string;
    companyId: string;
    companyUrl: string;
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
    location: string;
    position: any;
    paid: boolean;
    isSponsor: boolean;
    person: string;
    stage: string;
    ceo: string;
    type: string;
    employees: string;
    foundation: string;
    publishDate: string;
    reviewNum: string;
    recommendNum: string;
    approveNum: string;
    isSaved: boolean;
    isApplied: boolean;
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
            id: data.jobPO ? data.jobPO.id : data.id,
            logoURL: data.jobPO ? data.jobPO.dso.logoURL : data.dso.logoURL,
            jobTitle: data.jobPO ? data.jobPO.jobTitle : data.jobTitle,
            companyId: data.jobPO ? data.jobPO.dso.id : data.dso.id,
            companyUrl: data.jobPO ? data.jobPO.dso.url : data.dso.url,
            companyName: data.jobPO ? data.jobPO.dso.name : data.dso.name,
            jobDescription: data.jobPO ? data.jobPO.jobDescription : data.jobDescription,
            salaryStartingValue: data.jobPO ? data.jobPO.salaryStartingValue : data.salaryStartingValue,
            salaryEndValue: data.jobPO ? data.jobPO.salaryEndValue : data.salaryEndValue,
            address1: data.jobPO ? data.jobPO.address1 : data.address1,
            address2: data.jobPO ? data.jobPO.address2 : data.address2,
            location: data.jobPO ? data.jobPO.location : null,
            city: data.jobPO ? data.jobPO.city : data.city,
            state: data.jobPO ? data.jobPO.state : data.state,
            zipCode: data.jobPO ? data.jobPO.zipCode : data.zipCode,
            person: data.jobPO ? data.jobPO.person : data.person,
            employees: data.jobPO ? data.jobPO.dso.employees : data.dso.employees,
            stage: data.jobPO ? data.jobPO.dso.stage : data.dso.stage,
            companyDes: data.jobPO ? data.jobPO.dso.description : data.dso.description,
            foundation: data.jobPO ? data.jobPO.dso.year_of_foundation : data.dso.year_of_foundation,
            position: data.jobPO ? data.jobPO.position.coordinates : data.position.coordinates,
            isApplied: data.jobPO ? data.jobPO.isAttention : data.isAttention,
            ceo: data.jobPO ? data.jobPO.dso.ceo : data.dso.ceo,
            paid: data.jobPO ? data.jobPO.paid : data.paid,
            type: data.jobPO ? data.jobPO.type : data.type,
            isSponsor: data.jobPO ? data.jobPO.dso.isSponsor : data.dso.isSponsor,
            reviewNum: data.jobPO ? data.jobPO.dso.reviewNum : data.dso.reviewNum,
            recommendNum: data.jobPO ? data.jobPO.dso.recommendNum : data.dso.recommendNum,
            approveNum: data.jobPO ? data.jobPO.dso.approveNum : data.dso.approveNum,
            publishDate: this.dateFormat(data.jobPO ? data.jobPO.publishEnd.toString() : data.publishEnd.toString())
        });
    }
}
