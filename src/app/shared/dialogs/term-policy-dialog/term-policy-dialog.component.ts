import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ConfirmDialogStatus } from '../../../enums/confirm-dialog-status';

@Component({
  templateUrl: './term-policy-dialog.component.html',
  styleUrls: ['./term-policy-dialog.component.scss']
})
export class TermPolicyDialogComponent implements OnInit {

  type: string;

  constructor(public dialogRef: MatDialogRef<TermPolicyDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: TermPolicyDialogComponent) {
  }

  ngOnInit() {
    this.type = this.data.type;
  }

  close() {
    this.dialogRef.close(ConfirmDialogStatus.Closed);
  }
}
