import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { ConfirmDialogStatus } from '../../../enums/dialogs/confirm-dialog-status';
import { AlertDialogParams } from './alert-dialog-params';

@Component({
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.scss']
})
export class AlertDialogComponent {

  constructor(public dialogRef: MatDialogRef<AlertDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AlertDialogParams) {
  }

  close() {
    this.dialogRef.close(ConfirmDialogStatus.Closed);
  }

}
