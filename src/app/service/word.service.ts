import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Word } from '../model/word';
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
