import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-practice-type',
  templateUrl: './practice-type.component.html',
  styleUrls: ['./practice-type.component.scss']
})
export class PracticeTypeComponent implements OnInit {
  @Input('practiceTypeList') practiceTypeList: any[];
  @Input('practiceType') practiceType: any;
  @Output('closePracticeType') closePracticeType: EventEmitter<null> = new EventEmitter(null);
  @Output('selectPracticeType') selectPracticeType: EventEmitter<any> = new EventEmitter(null);

  practiceTypes: any[] = [];
  searchText = '';

  isSearch = false;

  constructor() {
  }

  ngOnInit() {
    console.log(this.practiceTypeList);
    this.practiceTypes = this.practiceTypeList;
  }

  _selectPracticeType(p) {
    console.log(p);
    this.searchText = p.name;
    this.practiceTypeList = this.practiceTypes;
    this.selectPracticeType.emit(p);
  }

  changeInput(key) {
    if (!this.isSearch) {
      this.practiceTypes = this.practiceTypeList;
      this.isSearch = true;
    }
    this.practiceTypeList = this.practiceTypes.filter((speciality: any) => speciality.name.toLocaleLowerCase().includes(key.toLocaleLowerCase()));
  }

  close() {
    this.practiceTypeList = this.practiceTypes;
    this.closePracticeType.emit();
  }

}
