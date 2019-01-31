import { formatDate } from '@angular/common';

export class Topic {
    id: string;
    moduleType: string;
    function: string;
    description: string;
    subDescription: any;

    deserialize(data: any): Topic {
        return <Topic>Object.assign({}, {
            id: data.id,
            moduleType: data.moduleType,
            function: data.function,
            description: data.description,
            subDescription: data.subDescription
        });
    }
}
