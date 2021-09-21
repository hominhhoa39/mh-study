import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullWord, Word, WordComment } from '../model/word';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class WordService {
  constructor(
    private httpClient: HttpClient,
    private utilService: UtilService
  ) {}

  searchOutside(word: string): Observable<Word> {
    return this.httpClient.post<Word>('/api/outside/search', { word });
  }

  suggestOutside(word: any): Observable<Word[]> {
    return this.httpClient.post<Word[]>('/api/outside/suggest', { word });
  }

  searchFullOutside(word: string): Observable<FullWord> {
    return this.httpClient.post<FullWord>('/api/outside/fullSearch', { word });
  }

  searchCommentOutside(wordId: number): Observable<WordComment[]> {
    return this.httpClient.post<WordComment[]>('/api/outside/commentSearch', { wordId });
  }

  save(word: Word): Observable<any> {
    return this.httpClient.post<any>('/api/words/create', {
      ...word,
      addDate: this.utilService.convDateToStr(new Date()),
    });
  }

  update(word: Word): Observable<any> {
    return this.httpClient.post<any>('/api/words/update', {
      ...word,
      addDate: this.utilService.convDateToStr(new Date()),
    });
  }

  findAll(addDate?: string): Observable<Word[]> {
    return this.httpClient.post<Word[]>('/api/words/findAll', { addDate });
  }
}
