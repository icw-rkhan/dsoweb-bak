import { formatDate } from '@angular/common';
import { environment } from 'src/environments/environment';

export class CourseBookmark {
    id: string;
    courseId: string;
    courseName: string;
    userId: string;

    deserialize(data: any): CourseBookmark {
        return <CourseBookmark>Object.assign({}, {
            id: data.id,
            courseId: data.courseId,
            courseName: data.courseName,
            userId: data.userId,
        });
    }
}
