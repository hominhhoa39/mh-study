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
  searchMoviesCtrl = new FormControl();
  filteredMovies: Word[] = [];
  isLoading = false;
  errorMsg!: string;

  constructor(private wordService: WordService, private http: HttpClient) {}

  ngOnInit() {
    this.searchMoviesCtrl.valueChanges
      .pipe(
        debounceTime(500),
        tap(() => {
          this.errorMsg = '';
          this.filteredMovies = [];
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
        // if (data['Search'] == undefined) {
        //   this.errorMsg = data['Error'];
        //   this.filteredMovies = [];
        // } else {
        //   this.errorMsg = "";
        this.filteredMovies = data;
        // }

        // console.log(this.filteredMovies);
      });
  }

  displayFn(w: Word): string {
    return w && w.word ? w.word : '';
  }
}
