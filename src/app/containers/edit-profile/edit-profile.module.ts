import {NgModule} from '@angular/core';

import { SharedModule } from '../../shared';
import { EditProfileComponent } from './edit-profile.component';
import { ResidencySearchComponent } from './residency-search/residency-search.component';
import { EditProfileRoutingModule } from './edit-profile.routing';
import { ModalModule, BsDatepickerModule } from 'ngx-bootstrap';
import { ResidencyAddComponent } from './residency-add/residency-add.component';
import { ResidencyEditComponent } from './residency-edit/residency-edit.component';
import { EducationSearchComponent } from './education-search/education-search.component';
import { EducationEditComponent } from './education-edit/education-edit.component';
import {SpecialtyComponent} from './specialty/specialty.component';
import {EditExperienceComponent} from './edit-experience/edit-experience.component';
import {PracticeTypeComponent} from './edit-experience/practice-type/practice-type.component';
import {PracticeRoleComponent} from './edit-experience/practice-role/practice-role.component';
import {PracticeDSOComponent} from './edit-experience/practice-dso/practice-dso.component';
import {MatDatepickerModule} from '@angular/material';
import { PracticeAddressComponent } from './practice-address/practice-address.component';

@NgModule({
  imports: [
    SharedModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot(),
    EditProfileRoutingModule,
    MatDatepickerModule
  ],
  exports: [
    MatDatepickerModule
  ],
  declarations: [
    EditProfileComponent,
    ResidencySearchComponent,
    ResidencyAddComponent,
    ResidencyEditComponent,
    SpecialtyComponent,
    EditExperienceComponent,
    PracticeTypeComponent,
    PracticeRoleComponent,
    PracticeDSOComponent,
    EducationSearchComponent,
    EducationEditComponent,
    SpecialtyComponent,
    PracticeAddressComponent
  ],
})
export class EditProfileModule { }
