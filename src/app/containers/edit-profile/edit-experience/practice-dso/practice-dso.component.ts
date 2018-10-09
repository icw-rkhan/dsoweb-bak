import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EditProfileService} from '../../edit-profile.service';

@Component({
  selector: 'app-practice-dso',
  templateUrl: './practice-dso.component.html',
  styleUrls: ['./practice-dso.component.scss']
})
export class PracticeDSOComponent implements OnInit {
  @Output('closePracticeDSO') closePracticeDSO: EventEmitter<null> = new EventEmitter(null);

  practiceDSO: any[] = [];
  filterList: any[] = [];
  searchText = '';


  constructor(public experienceService: EditProfileService) {
    this.experienceService.S_practiceDSO.subscribe(p => {
      this.practiceDSO = p;
      this.filterList = this.practiceDSO;
    });
  }

  ngOnInit() {

  }

  _selectPracticeDSO(dso) {
    this.searchText = '';
    this.experienceService.selectPracticeDSO(dso);
    this.closePracticeDSO.emit();
  }

  changeInput(key) {
    this.filterList = this.experienceService.S_practiceDSO.getValue().
    filter((role: any) => role.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()));
  }

  close() {
    this.searchText = '';
    this.closePracticeDSO.emit();
  }
}
