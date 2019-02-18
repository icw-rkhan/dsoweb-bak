import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';

import { AuthService } from '../../services';
import { SharingService } from 'src/app/services/sharing.service';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'dso-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.scss']
})
export class DocViewerComponent implements OnInit, AfterViewInit {

  @Input() src: string;
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  srcPath: SafeResourceUrl;

  @ViewChild('previewContainer') previewContainer: ElementRef;

  constructor(private authService: AuthService, private sharingService: SharingService) {
  }

  ngOnInit() {
    const email = this.authService.getUserInfo().user_name;
    const resumeUrl = `${environment.profileApiUrl}/resume?email=${email}&code=${localStorage.getItem('token')}`;
    this.srcPath = resumeUrl;
  }

  ngAfterViewInit() {
    const device = this.sharingService.getMyDevice();
    if (device === 'desktop') {
      const element = this.previewContainer.nativeElement;
      element.style.maxWidth = environment.fixedWidth;
    }
  }

  onClickEvent() {
    this.close.emit();
  }
}
