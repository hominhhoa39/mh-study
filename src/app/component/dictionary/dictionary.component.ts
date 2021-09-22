import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { debounceTime, tap, switchMap, finalize } from 'rxjs/operators';
import { FullWord, Word, WordComment } from 'src/app/model/word';
import { WordService } from 'src/app/service/word.service';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss'],
})
export class DictionaryComponent implements OnInit {
  @ViewChild(MatAutocompleteTrigger) matAutocomplete!: MatAutocompleteTrigger;
  searchWordsCtrl = new FormControl();
  filteredWords: Word[] = [];
  isLoading = false;
  searchResult!: FullWord;
  comments!: WordComment[];

  constructor(private wordService: WordService, private http: HttpClient) {}

  ngOnInit() {
    this.searchWordsCtrl.valueChanges
      .pipe(
        debounceTime(1000),
        tap(() => {
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

  search(word: string): void {
    if (word && word !== '') {
      this.wordService.searchFullOutside(word).subscribe((data) => {
        this.searchResult = data;
        const mobileId = data.mobileId;
        if (mobileId && mobileId >= 0) {
          this.wordService
            .searchCommentOutside(mobileId)
            .subscribe((comments) => {
              this.comments = comments;
            });
        }
      });
    }
  }

  onSuggestionChange(w: Word): void {
    this.searchWords.setValue(w);
    this.search(w.word);
  }

  onSearchClick(evt: MouseEvent) {
    this.matAutocomplete.closePanel();
    this.search(this.searchWordsCtrl.value.word ?? this.searchWordsCtrl.value);
  }

  onKeyDown(event: any) {
    if (event.keyCode === 13) {
      this.matAutocomplete.closePanel();
      this.search(this.searchWordsCtrl.value.word);
    }
  }

  onWordClick(word: string) {
    this.searchWords.setValue({ word });
    this.search(word);
  }
}
