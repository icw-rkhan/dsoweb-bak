import { formatDate } from '@angular/common';

export class Article {
    id: string;
    authorId: string;
    authorPhotoUrl: string;
    title: string;
    content: string;
    excerpt: string;
    date: string;
    details: string;
    contentTypeId: string;
    contentTypeName: string;
    categoryId: string;
    categoryName: string;
    sponsorId: string;
    sponsorName: string;
    featuredMediaId: string;

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
}
