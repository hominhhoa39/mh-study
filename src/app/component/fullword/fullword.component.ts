import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FullWord } from 'src/app/model/word';

@Component({
  selector: 'app-fullword',
  templateUrl: './fullword.component.html',
  styleUrls: ['./fullword.component.scss'],
})
export class FullwordComponent {
  @Input() word!: FullWord;
  @Output() wordClickEvent = new EventEmitter<string>();

  onWordClick(value: string) {
    this.wordClickEvent.emit(value);
  }
}
