import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Dsodentist } from '../../../models/dsodentist.model';

@Component({
  selector: 'dso-component-avatar',
  templateUrl: './component-avatar.component.html',
  styleUrls: ['./component-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentAvatarComponent implements OnInit {

  @Input() data: Dsodentist[];

  ngOnInit(): void {
  }

  onClose() {
    
  }

}
