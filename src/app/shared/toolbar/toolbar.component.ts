import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'dso-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() toggleMenu = new EventEmitter();

  onToggleMenu() {
    this.toggleMenu.emit();
  }
}
