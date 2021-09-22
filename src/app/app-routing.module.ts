import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { BookComponent } from './component/book/book.component';
import { DictionaryComponent } from './component/dictionary/dictionary.component';
import { WordsComponent } from './component/words/words.component';

const appRoutes: Routes = [
  // {
  //   path: 'books',
  //   component: BookComponent,
  //   data: { title: 'Book List' },
  // },
  {
    path: 'words',
    component: WordsComponent
  },
  {
    path: '',
    component: DictionaryComponent
  }
  // { path: '', redirectTo: '/words', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only)],
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
