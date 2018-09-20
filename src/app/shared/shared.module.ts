import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

import { SidebarComponent } from './sidebar/sidebar.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { AlertDialogComponent } from './dialogs/alert-dialog/alert-dialog.component';
import { TruncatePipe } from '../pipes/truncate.pipe';
import { FeedCardComponent } from './feed-card/feed-card.component';
import { MainActionsComponent } from './main-actions/main-actions.component';
import { NgxMasonryModule } from 'ngx-masonry';
import { FeedGridComponent } from './feed-grid/feed-grid.component';
import { TermPolicyDialogComponent } from './dialogs/term-policy-dialog/term-policy-dialog.component';
import { NgProgressHttpModule } from '@ngx-progressbar/http';
import { MainContainerComponent } from './main-container/main-container.component';
import { SponsorCardComponent } from './sponsor-card/sponsor-card.component';

const PIPES = [
  TruncatePipe
];

export const COMPONENTS = [
  SidebarComponent,
  ToolbarComponent,
  AlertDialogComponent,
  FeedCardComponent,
  SponsorCardComponent,
  MainActionsComponent,
  FeedGridComponent,
  TermPolicyDialogComponent,
  MainContainerComponent
];

export const MODULES = [
  CommonModule,
  RouterModule,
  FormsModule,
  ReactiveFormsModule,
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
];

@NgModule({
  imports: [
    ...MODULES,
    ShareModule.forRoot()
  ],
  declarations: [
    ...PIPES,
    ...COMPONENTS
  ],
  exports: [
    ...PIPES,
    ...COMPONENTS,
    ...MODULES,
  ],
  entryComponents: [
    AlertDialogComponent,
    TermPolicyDialogComponent
  ]
})
export class SharedModule {
}
