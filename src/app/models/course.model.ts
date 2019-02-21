import { formatDate } from '@angular/common';

export class Course {
    id: string;
    title: string;
    logoUrl: string;
    presenter: string;
    rating: string;
    level: string;
    duration: string;
    cost: string;
    sponsorId: string;
    isBookmarked: boolean;

    deserialize(data: any): Course {
        return <Course>Object.assign({}, {
            id: data._id,
            title: data.title,
            logoUrl: data.logoUrl,
            presenter: data.presenter,
            rating: data.rating,
            level: data.level,
            duration: data.duration,
            sponsorId: data.sponsorId,
            cost: data.cost
        });
    }
}
