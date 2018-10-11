import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditProfileService} from '../../edit-profile.service';

@Component({
  selector: 'app-practice-type',
  templateUrl: './practice-type.component.html',
  styleUrls: ['./practice-type.component.scss']
})
export class PracticeTypeComponent implements OnInit {
  @Output('closePracticeType') closePracticeType: EventEmitter<null> = new EventEmitter(null);

  practiceTypes: any[] = [];
  filterList: any[] = [];
  searchText = '';


  constructor(public experienceService: EditProfileService) {
    this.experienceService.S_practiceTypes.subscribe(p => {
      this.practiceTypes = p;
      this.filterList = this.practiceTypes;
    });
  }

  ngOnInit() {

  }

  _selectPracticeType(p) {
    this.searchText = '';
    this.experienceService.selectPracticeType(p);
    this.closePracticeType.emit();
  }

  changeInput(key) {
    this.filterList = this.experienceService.S_practiceTypes.getValue().filter((speciality: any) =>
    speciality.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()));
  }

  close() {
    this.searchText = '';
    this.closePracticeType.emit();
  }
}
