import { formatDate } from '@angular/common';

import { Serializable } from './serializable.model';

import * as _ from 'lodash';

export class Alert implements Serializable<Alert> {
    id: string;
    keyword: string;
    location: string;
    distance: string;
    status: boolean;

    deserialize(data: any): Alert {
        return <Alert>Object.assign({}, {
            id: data.resultMap.id,
            keyword: data.resultMap.keyword,
            location: data.resultMap.location,
            distance: data.resultMap.distance,
            status: data.resultMap.status
        });
    }
}
