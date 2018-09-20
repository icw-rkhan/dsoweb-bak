import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Residency } from '../../../models/residency.model';

@Component({
  selector: 'dso-residency-search',
  templateUrl: './residency-search.component.html',
  styleUrls: ['./residency-search.component.scss']
})
export class ResidencySearchComponent implements OnInit {
  @Input('residency') residency: Residency;
  @Input('listResidency') listResidency: any[];
  @Output() selectedResidency: EventEmitter<Residency> = new EventEmitter(null);
  @Output() closeResidencySearch: EventEmitter<null> = new EventEmitter(null);
  residencies: any[] = [];
  searchText = '';
  
  constructor() { }

  ngOnInit() {
    this.residencies = this.listResidency;
  }

  changeInput(e) {
    this.residencies = this.listResidency.filter((r: any) =>  r.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase()));
  }

  _selectResidency(r: any) {
    this.searchText = r.name;
    const re = new Residency().deserialize(r);
    this.selectedResidency.emit(re);
  }

  close() {
    this.closeResidencySearch.emit();
  }
}
