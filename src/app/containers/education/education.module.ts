import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';

import { SharedModule } from '../../shared/shared.module';
import { EducationRoutingModule } from './education.routing';

import { EducationComponent } from './education.component';
import { EducationMainComponent } from './education-main/education-main.component';
import { EducationSponsorComponent } from './education-sponsor/education-sponsor.component';
import { EducationBookmarksComponent } from './education-bookmarks/education-bookmarks.component';
import { EducationSearchComponent } from './education-search/education-search.component';
import { EducationDownloadsComponent } from './education-downloads/education-downloads.component';
import { EducationCoursesComponent } from './education-courses/education-courses.component';

@NgModule({
    imports: [
        EducationRoutingModule,
        SharedModule,
        SlideshowModule
    ],
    declarations: [
        EducationComponent,
        EducationMainComponent,
        EducationSponsorComponent,
        EducationBookmarksComponent,
        EducationSearchComponent,
        EducationDownloadsComponent,
        EducationCoursesComponent
    ]
})
export class EducationModule {}
