import { formatDate } from '@angular/common';

export class Term {
    id: string;
    type: string;
    content: string;
    createTime: string;
    updateTime: string;

    // change the format of the data
    dateFormat(date: Date): any {
        if (date) {
        return formatDate(date, 'MMMM y', 'en-US');
        }

        return '';
    }

    deserialize(data: any): Term {
        return <Term>Object.assign({}, {
            id: data.id,
            type: data.type,
            content: data.content,
            createTime: this.dateFormat(new Date(data.createTime)),
            updateTime: this.dateFormat(new Date(data.updateTime))
        });
    }
}
