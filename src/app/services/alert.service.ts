import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  swal(args = {}) {
    return swal(args);
  }

  public errorAlert(content) {
    const baseOptions = {
      title: '<span style="font-size: 20px">Error</span>',
      html: '<span style="font-size: 16px">' + content + '</span>',
      heightAuto: false,
      minHeight: '200px',
      width: '300px',
      timer: 5000,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Close',
      cancelButtonClass: 'alert-cancel-button',
      background: 'rgba(248, 248, 248, 0.82)'
    };
    return this.swal((<any>Object).assign(baseOptions)).catch(swal.noop);
  }

  public successAlert(content) {
    const baseOptions = {
      title: '<span style="font-size: 20px">Success</span>',
      html: '<span style="font-size: 16px">' + content + '</span>',
      heightAuto: false,
      minHeight: '200px',
      width: '300px',
      timer: 5000,
      showConfirmButton: false,
      showCancelButton: true,
      cancelButtonText: 'Okay',
      cancelButtonClass: 'alert-button',
      background: 'rgba(248, 248, 248, 0.82)'
    };
    return this.swal((<any>Object).assign(baseOptions)).catch(swal.noop);
  }

  public confirmAlert(title, content) {
    const baseOptions = {
      title: '<span style="font-size: 20px">' + title + '</span>',
      html: '<span style="font-size: 16px">' + content + '</span>',
      heightAuto: false,
      minHeight: '200px',
      width: '300px',
      showCancelButton: true,
      reverseButtons: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      cancelButtonClass: ['alert-confirm-button', 'alert-button'],
      confirmButtonClass: ['alert-confirm-button', 'alert-button'],
      background: 'rgba(248, 248, 248, 0.82)'
    };
    return this.swal((<any>Object).assign(baseOptions)).catch(swal.noop);
  }
}
