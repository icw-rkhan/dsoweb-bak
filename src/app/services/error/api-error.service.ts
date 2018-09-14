import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ERRORS } from '../../models/api-response-error';
import { AlertDialogComponent } from '../../shared/dialogs/alert-dialog/alert-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ApiErrorService {

  constructor(
    private dialog: MatDialog
  ) { }

  checkError(code: number, module: string) {
    if (ERRORS[module]) {
      this.dialog.open(AlertDialogComponent, {
        width: '300px',
        height: '200px',
        data: {
          title: 'Error',
          body: ERRORS[module][code] ? ERRORS[module][code] : ERRORS['common'][code]
        }
      });
    }
  }
}
