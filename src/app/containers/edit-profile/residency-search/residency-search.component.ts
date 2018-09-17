import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ResidencyService } from '../../../services/residency.service';
import { Residency } from '../../../models/residency.model';

@Component({
  selector: 'dso-residency-search',
  templateUrl: './residency-search.component.html',
  styleUrls: ['./residency-search.component.scss']
})
export class ResidencySearchComponent implements OnInit {
  oresidencies: Residency[] = [];
  residencies: Residency[] = [];
  searchText = '';
  @Output() selectResidency: EventEmitter<Residency> = new EventEmitter(null);

  constructor(private residencyService: ResidencyService) { }

  ngOnInit() {
    this.residencyService.fetchResidencies().subscribe((res: Residency[]) => {
      this.residencies = this.oresidencies = res;
    });
  }

  changeInput(e) {
    this._filter(e.target.value);
  }

  _selectResidency(r: Residency) {
    this.searchText = r.name;
    this._filter(r.name);
    this.selectResidency.emit(r);
  }

  private _filter(str) {
    this.residencies = this.oresidencies.filter((r: Residency) =>  r.name.toLocaleLowerCase().includes(str.toLocaleLowerCase()));
  }
}
