export interface Movie {
  id: string;
  title: string;
  url: string;
  sharedBy: string;
  description: string;
}

export interface MovieContextData {
  movies: Movie[];
  user: any;
  appLoading: boolean;
  setMovies: (movies: Movie[]) => void;
}
