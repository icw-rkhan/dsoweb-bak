import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../../models/post.model';

@Component({
  templateUrl: './tip-sheets-page.html',
  styleUrls: ['./tip-sheets-page.scss']
})
export class TipSheetsPageComponent implements OnInit {

  posts$: Observable<Post[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit(): void {
    this.posts$ = this.postService.posts('tip-sheets');
  }

}
