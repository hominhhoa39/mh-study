import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  books: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('/book/list').subscribe(data => {
      this.books = data;
    });
  }
}
