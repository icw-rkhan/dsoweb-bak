import { formatDate } from '@angular/common';

export class Unite {
    id: string;
    thumbnail: string;
    date: string;
    details: string;
    pdfId: string;
    author: string;
    isDownload: boolean;

    // change the format of the data
    dateFormat(date: Date): any {
        if (date) {
        return formatDate(date, 'MMMM y', 'en-US');
        }

        return '';
    }

    makeDetails(vol: string, issue: string) {
        return `Vol ${vol} Issue ${issue}`;
    }

    deserialize(data: any): Unite {
        return <Unite>Object.assign({}, {
            id: data._id,
            thumbnail: 'assets/images/unite/cover-page.png',
            date: this.dateFormat(new Date(data.publishDate)),
            details: this.makeDetails(data.vol, data.issue),
            pdfId: data.pdfId,
            author: data.createUser
        });
    }
}
