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
    zipCode: string;
    location: string;
    position: any;
    paid: boolean;
    isSponsor: boolean;
    person: string;
    stage: string;
    ceo: string;
    ceoUrl: string;
    type: string;
    rating: string;
    employees: string;
    foundation: string;
    publishDate: string;
    reviewNum: string;
    recommendNum: string;
    approveNum: string;
    savedId: string;
    isNew: boolean;
    isUpdated: boolean;
    isSaved: boolean;
    isApplied: boolean;
    isAttention: boolean;
    status: number;

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
            logoURL: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.logoURL : null
                : data.dso ? data.dso.logoURL : null,
            jobTitle: data.jobPO ? data.jobPO.jobTitle : data.jobTitle,
            companyId: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.id : null
                : data.dso ? data.dso.id : null,
            companyUrl: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.url : null
                : data.dso ? data.dso.url : null,
            companyName: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.name : null
                : data.dso ? data.dso.name : null,
            jobDescription: data.jobPO ? data.jobPO.jobDescription : data.jobDescription,
            salaryStartingValue: data.jobPO ? data.jobPO.salaryStartingValue : data.salaryStartingValue,
            salaryEndValue: data.jobPO ? data.jobPO.salaryEndValue : data.salaryEndValue,
            address1: data.jobPO ? data.jobPO.address1 : data.address1,
            address2: data.jobPO ? data.jobPO.address2 : data.address2,
            location: data.jobPO ? data.jobPO.location : null,
            city: data.jobPO ? data.jobPO.city : data.city,
            state: data.jobPO ? data.jobPO.state : data.state,
            status: data.jobPO ? data.jobPO.status : data.status,
            zipCode: data.jobPO ? data.jobPO.zipCode : data.zipCode,
            person: data.jobPO ? data.jobPO.person : data.person,
            employees: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.employees : null
                : data.dso ? data.dso.employees : null,
            stage: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.stage : null
                : data.dso ? data.dso.stage : null,
            companyDes: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.description : null
                : data.dso ? data.dso.description : null,
            foundation: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.year_of_foundation : null
                : data.dso ? data.dso.year_of_foundation : null,
            position: data.jobPO ? data.jobPO.position ? data.jobPO.position.coordinates : null
                : data.position ? data.position.coordinates : null,
            savedId: data.jobPO ? data.id : null,
            isNew: data.jobPO ? data.jobPO.isNewJob : data.isNewJob,
            isUpdated: data.jobPO ? data.jobPO.updated : data.updated,
            isSaved: data.jobPO ? data.jobPO.isAttention : data.isAttention,
            isApplied: data.jobPO ? data.jobPO.isApplication : data.isApplication,
            ceoUrl: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.ceopictureurl : null
                : data.dso ? data.dso.ceopictureurl : null,
            ceo: data.jobPO ? data.jobPO.ceo : data.dso ? data.dso.ceo : null,
            paid: data.jobPO ? data.jobPO.paid : data.paid,
            type: data.jobPO ? data.jobPO.type : data.type,
            rating: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.rating : null
                : data.dso ? data.dso.rating : null,
            isSponsor: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.is_sponsor : null
                : data.dso ?  data.dso.is_sponsor : null,
            reviewNum: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.reviewNum : null
                : data.dso ?  data.dso.reviewNum : null,
            recommendNum: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.recommendNum : null
                : data.dso ?  data.dso.recommendNum : null,
            approveNum: data.jobPO ? data.jobPO.dso ? data.jobPO.dso.approveNum : null
                : data.dso ?  data.dso.approveNum : null,
            publishDate: this.dateFormat(data.jobPO ? data.jobPO.publishOn ? data.jobPO.publishOn.toString() : null
                : data.publishOn ? data.publishOn.toString() : null)
        });
    }
}
