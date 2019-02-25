import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

export class Course {
    id: string;
    title: string;
    curriculumId: string;
    description: string;
    logoUrl: string;
    presenter: string;
    rating: string;
    level: string;
    duration: string;
    cost: string;
    sponsorId: string;
    isBookmarked: boolean;

    getLogoURl(id: string) {
        return `${environment}/file/downloadFileByObjectId?objectId=${id}`;
    }

    deserialize(data: any): Course {
        return <Course>Object.assign({}, {
            id: data.id,
            title: data.name,
            curriculumId: data.curriculumId,
            logoUrl: this.getLogoURl(data.image),
            presenter: data.presenter,
            rating: data.rating,
            level: data.beginner,
            duration: data.timeRequired,
            sponsorId: data.sponsorId,
            cost: data.free ? null : data.price
        });
    }
}
