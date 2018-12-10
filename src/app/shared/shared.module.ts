import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatDatepickerModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { CustomFormsModule } from 'ngx-custom-validators';
import { ShareModule } from '@ngx-share/core';
import { NgxMasonryModule } from 'ngx-masonry';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { FeedCardComponent } from './cards/feed-card/feed-card.component';
import { MainActionsComponent } from './main-actions/main-actions.component';
import { FeedGridComponent } from './feed-grid/feed-grid.component';
import { TermPolicyDialogComponent } from './dialogs/term-policy-dialog/term-policy-dialog.component';
import { MainContainerComponent } from './main-container/main-container.component';
import { ReviewComponent } from './cards/review-card/review-card.component';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { UniteCardComponent } from './cards/unite-card/unite-card.component';
import { ArticleCardComponent } from './cards/article-card/article-card.component';
import { ScreenCardComponent } from './cards/screen-card/screen-card.component';
import { IssueMenuComponent } from './menus/issue-menu/issue-menu.component';
import { SearchMenuComponent } from './menus/search-menu/search-menu.component';
import { DetailCardComponent } from './cards/detail-card/detail-card.component';
import { CareerActionsComponent } from './career-actions/career-actions.component';
import { MultipleCategoriesPipe } from '../pipes/multiple-categories.pipe';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { SafePipe } from '../pipes/safe.pipe';
import { SavedPipe } from '../pipes/save.pipe';
import { CompanyCardComponent } from './cards/company-card/company-card.component';
import { JobCardComponent } from './cards/job-card/job-card.component';
import { JobExtendCardComponent } from './cards/job-extend-card/job-extend-card.component';

const PIPES = [
  SafePipe,
  SavedPipe,
  TruncatePipe,
  MultipleCategoriesPipe
];

export const COMPONENTS = [
  SidebarComponent,
  ToolbarComponent,
  AlertDialogComponent,
  FeedCardComponent,
  ReviewComponent,
  CompanyCardComponent,
  JobCardComponent,
  PdfViewerComponent,
  MainActionsComponent,
  FeedGridComponent,
  TermPolicyDialogComponent,
  MainContainerComponent,
  UniteCardComponent,
  ArticleCardComponent,
  ScreenCardComponent,
  IssueMenuComponent,
  SearchMenuComponent,
  DetailCardComponent,
  JobExtendCardComponent,
  CareerActionsComponent,
];

export const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  FlexLayoutModule,
  ReactiveFormsModule,
  InfiniteScrollModule,
  // Angular material modules
  MatToolbarModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTooltipModule,
  MatSortModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSelectModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatListModule,
  MatMenuModule,
  MatCardModule,
  MatTableModule,
  MatTabsModule,
  MatGridListModule,
  MatSnackBarModule,
  CustomFormsModule,
  NgxMasonryModule,
  NgProgressHttpModule,
  PdfViewerModule
];

@NgModule({
  imports: [
    ...MODULES,
    ShareModule.forRoot()
  ],
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  exports: [
    ...MODULES,
    ...COMPONENTS,
    ...PIPES,
  ],
  entryComponents: [
    AlertDialogComponent,
    TermPolicyDialogComponent
  ]
})
export class SharedModule {
}
