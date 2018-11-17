import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'dso-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent implements OnInit {
  @Input() src: string;
  @Input() title: string;
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onClickEvent() {
    this.close.emit();
  }

}
