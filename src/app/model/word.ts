export interface Word {
  id?: string;
  word: string;
  phonetic?: string;
  meaning?: string;
  example?: string;
  addDate?: string;
  mobileId?: number;
}

interface Example {
  content?: string;
  mean?: string;
  transcription?: string;
}

interface Mean {
  examples?: Example[];
  kind?: string;
  mean: string;
}

export interface WordComment {
  dislike: number;
  like: number;
  mean: string;
  reportId: number;
  status: number;
  type: number;
  userId: number;
  username: string;
  word: string;
  wordId: string;
  type_data: string;
  dict: string;
  action?: string;
}

export interface FullWord {
  word: string;
  phonetic?: string;
  mobileId?: number;
  means: Mean[];
  opposite_word?: string[];
  related_words?: {word: string[]};
}

