import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ShareModule } from '@ngx-share/core';

import { SharedModule } from '../../shared';
import { DetailRoutingModule } from './detail.routing';

import { DetailComponent } from './detail.component';
import { CommonComponent } from './common/common.component';
import { SponsorComponent } from './sponsor/sponsor.component';
import { RelativeComponent } from './relative/relative.component';
import { FeedsByAuthorComponent } from './feeds-by-author/feeds-by-author.component';

@NgModule({
    imports: [
        CommonModule,
        FlexLayoutModule,
        SharedModule,
        DetailRoutingModule,
        ShareModule.forRoot()
    ],
    declarations: [
        DetailComponent,
        CommonComponent,
        SponsorComponent,
        RelativeComponent,
        FeedsByAuthorComponent
    ],
})

export class DetailModule {}
