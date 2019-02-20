import { NgModule } from '@angular/core';
import { SlideshowModule } from 'ng-simple-slideshow';

import { SharedModule } from '../../shared/shared.module';
import { EducationRoutingModule } from './education.routing';

import { EducationComponent } from './education.component';
import { EducationMainComponent } from './education-main/education-main.component';

@NgModule({
    imports: [
        EducationRoutingModule,
        SharedModule,
        SlideshowModule
    ],
    declarations: [
        EducationComponent,
        EducationMainComponent
    ]
})
export class EducationModule {}
