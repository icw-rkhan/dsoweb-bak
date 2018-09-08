import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'dso-component-one',
  templateUrl: './component-one.component.html',
  styleUrls: ['./component-one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentOneComponent implements OnInit {

  ngOnInit(): void {
  }

}
