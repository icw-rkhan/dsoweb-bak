import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.srcPath = this.sanitizer.bypassSecurityTrustResourceUrl(`https://docs.google.com/gview?url=${this.src}&embedded=true`);
    console.log(this.srcPath);
  }

  onClickEvent() {
    this.close.emit();
  }
}
