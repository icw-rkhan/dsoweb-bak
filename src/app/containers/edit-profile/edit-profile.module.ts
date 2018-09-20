import {NgModule} from '@angular/core';

import {SharedModule} from '../../shared';
import {EditProfileComponent} from './edit-profile.component';
import {ResidencySearchComponent} from './residency-search/residency-search.component';
import {EditProfileRoutingModule} from './edit-profile.routing';
import {BsDatepickerModule, ModalModule} from 'ngx-bootstrap';
import {ResidencyAddComponent} from './residency-add/residency-add.component';
import {ResidencyEditComponent} from './residency-edit/residency-edit.component';
import {SpecialityComponent} from './speciality/speciality.component';
import {EditExperienceComponent} from './edit-experience/edit-experience.component';
import {PracticeTypeComponent} from './edit-experience/practice-type/practice-type.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    EditProfileRoutingModule
  ],
  declarations: [
    EditProfileComponent,
    ResidencySearchComponent,
    ResidencyAddComponent,
    ResidencyEditComponent,
    SpecialityComponent,
    EditExperienceComponent,
    PracticeTypeComponent
  ],
})
export class EditProfileModule { }
