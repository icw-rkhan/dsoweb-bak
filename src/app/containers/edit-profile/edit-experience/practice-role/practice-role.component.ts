import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditProfileService} from '../../edit-profile.service';

@Component({
  selector: 'app-practice-role',
  templateUrl: './practice-role.component.html',
  styleUrls: ['./practice-role.component.scss']
})
export class PracticeRoleComponent implements OnInit {
  @Output('closePracticeRole') closePracticeRole: EventEmitter<null> = new EventEmitter(null);

  practiceRoles: any[] = [];
  filterList: any[] = [];
  searchText = '';


  constructor(public experienceService: EditProfileService) {
    this.experienceService.S_practiceRoles.subscribe(p => {
      console.log('con' ,p);
      this.practiceRoles = p;
      this.filterList = this.practiceRoles;
    });
  }

  ngOnInit() {

  }

  _selectPracticeRole(r) {
    this.searchText = '';
    this.experienceService.selectPracticeRole(r);
    this.closePracticeRole.emit();
  }

  changeInput(key) {
    this.filterList = this.experienceService.S_practiceRoles.getValue().filter((role: any) => role.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()));
  }

  close() {
    this.searchText = '';
    this.closePracticeRole.emit();
  }

}
