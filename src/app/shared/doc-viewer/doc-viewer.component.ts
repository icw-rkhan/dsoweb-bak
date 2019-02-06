import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';
import { AuthService } from '../../services';

@Component({
  selector: 'dso-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit {

  @Input() src: string;
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  srcPath: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private authService: AuthService) {
  }

  ngOnInit() {
    const email = this.authService.getUserInfo().user_name;
    const resumeUrl = `${environment.profileApiUrl}/resumeDownLoadByEmail?email='${email}'&code='Bearer ${localStorage.getItem('token')}'`;
    this.srcPath = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${resumeUrl}&embedded=true`);
  }

  onClickEvent() {
    this.close.emit();
  }
}
