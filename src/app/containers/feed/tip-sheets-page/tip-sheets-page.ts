import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './tip-sheets-page.html',
  styleUrls: ['./tip-sheets-page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TipSheetsPageComponent implements OnInit {

  ngOnInit(): void {
  }

}
