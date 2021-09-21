import { Component, Input, OnInit } from '@angular/core';
import { WordComment } from 'src/app/model/word';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent {
  @Input() comments!: WordComment[];
}
