import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'dso-screen-card',
  templateUrl: './screen-card.component.html',
  styleUrls: ['./screen-card.component.scss']
})
export class ScreenCardComponent implements OnInit {

  @Input() issueId: string;
  @Input() article: Post;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onDetailUnite(id: string) {
    if (id) {
      this.router.navigate([`/unite/detail/${this.issueId}/${id}`]);
    }
  }

}
