import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { Word } from 'src/app/model/word';
import { WordService } from 'src/app/service/word.service';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  searchWordsCtrl = new FormControl();
  filteredWords: Word[] = [];
  isLoading = false;
  errorMsg!: string;

  constructor(private wordService: WordService, private http: HttpClient) {}

  ngOnInit() {
    this.searchWordsCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => {
          this.errorMsg = '';
          this.filteredWords = [];
          this.isLoading = true;
        }),
        switchMap((value) =>
          this.http
            .post<Word[]>('/api/outside/suggest', {
              word: value,
            })
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe((data) => {
        this.filteredWords = data;
      });
  }

  get searchWords() {
    return this.searchWordsCtrl;
  }

  displayFn(w: Word): string {
    return w && w.word ? w.word : '';
  }

  onSearch(w: Word): void {
    console.log(`Selected ${w.word}`);
    this.wordService.searchFullOutside(w.word).subscribe(data => {
      console.log(data);
      const mobileId = data.mobileId;
      if (mobileId && mobileId >= 0) {
        this.wordService.searchCommentOutside(mobileId).subscribe(comments => {
          console.log(comments);
        })
      }
    })
  }
}
