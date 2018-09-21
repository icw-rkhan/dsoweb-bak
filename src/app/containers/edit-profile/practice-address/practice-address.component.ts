import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';

@Component({
  selector: 'app-practice-address',
  templateUrl: './practice-address.component.html',
  styleUrls: ['./practice-address.component.scss']
})
export class PracticeAddressComponent implements OnInit {
  @Input('userPracticeAddress') userPracticeAddress: any;
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() setPracticeAddress: EventEmitter<any> = new EventEmitter(null);

  practiceAddress: any;

  constructor() {
    if (isNullOrUndefined(this.userPracticeAddress)) {
      this.practiceAddress = {
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        states: ''
      };
    } else {
      this.practiceAddress = this.userPracticeAddress;
    }
  }

  ngOnInit() {
  }

  save() {
    this.setPracticeAddress.emit(this.practiceAddress);
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
