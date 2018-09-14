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

  checkError(code: number, data: any, module: string) {
    if (ERRORS[module]) {
      let errorMessage = ERRORS[module][code] ? ERRORS[module][code] : ERRORS['common'][code];
      Object.keys(data).map((key: any) => {
        errorMessage = errorMessage.replace(`{${key}}`, data[key]);
      });
      this.dialog.open(AlertDialogComponent, {
        width: '300px',
        height: '200px',
        data: {
          title: 'Error',
          body: errorMessage
        }
      });
    }
  }
}
