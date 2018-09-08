import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Example } from '../../../models/example.model';

@Component({
  selector: 'dso-component-two',
  templateUrl: './component-two.component.html',
  styleUrls: ['./component-two.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentTwoComponent implements OnInit {

  @Input() data: Example[];

  ngOnInit(): void {
  }

}
