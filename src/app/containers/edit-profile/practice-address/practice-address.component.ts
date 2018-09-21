import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {isNullOrUndefined} from 'util';
import {AlertService} from '../../../services/alert.service';
import {EditProfileService} from '../edit-profile.service';
import {ProfileService} from '../../../services';

@Component({
  selector: 'app-practice-address',
  templateUrl: './practice-address.component.html',
  styleUrls: ['./practice-address.component.scss']
})
export class PracticeAddressComponent implements OnInit {
  @Input('userPracticeAddress') userPracticeAddress: any;
  @Output() closeModal: EventEmitter<null> = new EventEmitter(null);
  @Output() setPracticeAddress: EventEmitter<any> = new EventEmitter(null);

  PAddress: any;

  isEditState: boolean;
  listState: any[];

  state: any;

  constructor(private alertService: AlertService,
              private profileService: ProfileService,
              private editProfileService: EditProfileService) {
    this.isEditState = false;
    console.log('init', this.editProfileService.S_practiceAddress);
    if (isNullOrUndefined(this.editProfileService.S_practiceAddress)) {
      this.PAddress = {
        address1: '',
        address2: '',
        city: '',
        zipCode: '',
        states: ''
      };
    } else {
      this.state = this.editProfileService.S_practiceAddress.states;
      this.PAddress = this.editProfileService.S_practiceAddress;
    }
  }

  ngOnInit() {
    this.getListStates();
  }

  getListStates() {
    this.profileService.getListState().subscribe(states => {
      this.listState = states.resultMap.data;
    });
  }

  setState(s) {
    this.PAddress.states = s.state;
    this.state = s.state;
  }

  save() {
    if (this.PAddress.address1 === '') {
      this.alertService.alertInfo('Error', 'Address can\'t be blank');
      return;
    }

    if (isNaN(this.PAddress.zipCode)) {
      this.alertService.alertInfo('Error', 'Zipcode format is wrong');
      return;
    }

    if (this.PAddress.zipCode === '') {
      this.alertService.alertInfo('Error', 'Zipcode can\'t be blank');
      return;
    }

    if (this.PAddress.city === '') {
      this.alertService.alertInfo('Error', 'City can\'t be blank');
      return;
    }

    if (this.PAddress.states === '') {
      this.alertService.alertInfo('Error', 'States can\'t be blank');
      return;
    }

    this.setPracticeAddress.emit(this.PAddress);
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}
