import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Alert implements Serializable<Alert> {
    id: string;
    keyword: string;
    location: string;
    distance: string;
    frequency: number;
    userId: string;
    status: boolean;

    deserialize(data: any): Alert {
        return <Alert>Object.assign({}, {
            id: data.id,
            keyword: data.keyword,
            location: data.location,
            distance: data.distance,
            frequency: data.frequency,
            userId: data.userId,
            status: data.status
        });
    }
}
