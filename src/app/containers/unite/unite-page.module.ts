import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap';
import { GoTopButtonModule } from 'ng2-go-top-button';

import { SharedModule } from '../../shared/shared.module';
import { UniteRoutingModule } from './unite-page.routing';

import { UnitePageComponent } from './unite-page';
import { UniteMainComponent } from './unite-main/unite-main.component';
import { UniteViewComponent } from './unite-view/unite-view.component';
import { UniteDetailComponent } from './unite-detail/unite-detail.component';
import { UniteBookmarkComponent } from './unite-bookmark/unite-bookmark.component';
import { UniteThumbnailComponent } from './unite-thumbnail/unite-thumbnail.component';

@NgModule({
    imports: [
        SharedModule,
        ModalModule.forRoot(),
        UniteRoutingModule,
        GoTopButtonModule
    ],
    declarations: [
        UnitePageComponent,
        UniteMainComponent,
        UniteBookmarkComponent,
        UniteViewComponent,
        UniteDetailComponent,
        UniteThumbnailComponent
    ],
})
export class UnitePageModule {}
