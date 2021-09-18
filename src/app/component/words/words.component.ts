import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Word } from '../../model/word';
import { UtilService } from '../../service/util.service';
import { WordService } from '../../service/word.service';

@Component({
  selector: 'app-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
})
export class WordsComponent implements OnInit {

  wordForm: FormGroup;

  words: Word[] = [];
  currentDate: Date = new Date();
  currentDateInStr = '';

  constructor(
    private fb: FormBuilder,
    private wordService: WordService,
    private utilService: UtilService
  ) {
    this.wordForm = this.fb.group({
      id: [''],
      word: ['', [Validators.required]],
      phonetic: ['', [Validators.required]],
      meaning: [''],
      example: [''],
      mobileId: [''],
    });

    this.currentDateInStr = this.utilService.convDateToStr(this.currentDate);
  }

  ngOnInit(): void {
    this.getDailyWords();
  }

  get word() {
    return <FormControl>this.wordForm.get('word');
  }

  onFormSubmit(): void {
    const formValue = this.wordForm.value as Word;
    const word: Word = {
      word: formValue.word,
      phonetic: formValue.phonetic,
      meaning: formValue.meaning,
      example: formValue.example,
      mobileId: formValue.mobileId ?? -9999
    };
    const wordId = formValue.id;
    if (wordId && wordId.trim() !== '') {
      word.id = wordId;
      this.wordService.update(word).subscribe((data) => {
        this.utilService.openSnackBar('Updated successfully!', '');
        this.resetForm();
        this.getDailyWords();
      });
    } else {
      this.wordService.save(word).subscribe((data) => {
        this.utilService.openSnackBar('Saved successfully!', '');
        this.resetForm();
        this.getDailyWords();
      });
    }
  }

  searchWord(evt: MouseEvent) {
    evt.preventDefault();
    this.wordService.searchOutside(this.word.value).subscribe((result) => {
      this.wordForm.get('phonetic')?.setValue(result.phonetic);
      this.wordForm.get('meaning')?.setValue(result.meaning);
      this.wordForm.get('example')?.setValue(result.example);
      this.wordForm.get('mobileId')?.setValue(result.mobileId);
    });
  }

  getDailyWords(): void {
    this.wordService.findAll(this.currentDateInStr).subscribe((words) => {
      this.words = words;
      console.log(words);
    });
  }

  editWord(event:any, word: Word): void {
    event.stopPropagation();
    this.wordForm.get('id')?.setValue(word.id);
    this.wordForm.get('word')?.setValue(word.word);
    this.wordForm.get('phonetic')?.setValue(word.phonetic);
    this.wordForm.get('meaning')?.setValue(word.meaning);
    this.wordForm.get('example')?.setValue(word.example);
  }

  resetForm() {
    this.wordForm.reset();
    this.wordForm.clearValidators();
    // Object.keys(this.wordForm.controls).forEach((key) => {
    //   this.wordForm.get(key)?.setErrors(null);
    // });
  }
}
