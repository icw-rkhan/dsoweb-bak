import { Injectable } from '@angular/core';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  swal(args = {}) {
    return swal(args);
  }

  public alertInfo(title, content) {
    const baseOptions = {
      title: '<span style="font-size: 20px">' + title + '</span>',
      html: '<span style="font-size: 16px">' + content + '</span>',
      heightAuto: false,
      minHeight: '200px',
      width: '300px',
      timer: 5000,
      showConfirmButton: false,
      background: 'rgba(248, 248, 248, 0.82)'
    };
    return this.swal((<any>Object).assign(baseOptions)).catch(swal.noop);
  }
}
