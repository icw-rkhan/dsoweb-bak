import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {AlertService} from '../../../services/alert.service';
import {EditProfileService} from '../edit-profile.service';
import {ProfileService} from '../../../services';
import { Address } from '../../../models/address.model';

@Component({
  selector: 'app-practice-address',
  templateUrl: './practice-address.component.html',
  styleUrls: ['./practice-address.component.scss']
})
export class PracticeAddressComponent implements OnInit {
  @Input() address: Address;
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() setPracticeAddress: EventEmitter<any> = new EventEmitter(null);

  isEditState: boolean;
  listState: any[];
  modalType: string;

  state: any;

  constructor(
    private alertService: AlertService,
    private profileService: ProfileService,
    private editProfileService: EditProfileService) {
    
  }

  ngOnInit() {
    this.getListStates();
    if (isNullOrUndefined(this.address)) {
      this.address = new Address();
    }
  }

  getListStates() {
    this.profileService.getListState().subscribe(states => {
      this.listState = states.resultMap.data;
    });
  }

  setState(s) {
    this.address.states = s.state;
    this.state = s.state;
  }

  save() {
    if (this.address.address1 === '') {
      this.alertService.errorAlert('Address can\'t be blank');
      return;
    }

    if (isNaN(parseInt(this.address.zipCode))) {
      this.alertService.errorAlert('Zipcode format is wrong');
      return;
    }

    if (this.address.zipCode === '') {
      this.alertService.errorAlert('Zipcode can\'t be blank');
      return;
    }

    if (this.address.city === '') {
      this.alertService.errorAlert('City can\'t be blank');
      return;
    }

    if (this.address.states === '') {
      this.alertService.errorAlert('States can\'t be blank');
      return;
    }
    
    this.setPracticeAddress.emit(new Address().deserialize(this.address));
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
