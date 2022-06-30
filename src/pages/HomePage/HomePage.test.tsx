import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MoviesContext } from '../../App';
import { Movie } from '../../utils/types';
import HomeMovieItem from './HomeMovieItem';
import { HomeMovieList } from './HomeMovieList';
import HomePage from './HomePage';

jest.mock('@firebase/firestore', () => ({
  getDocs() {
    return Promise.resolve([
      {
        id: 1,
        data: () => ({
          title: 'Demo',
          url: 'https://www.youtube.com/embed/id',
          description: 'Description',
          sharedBy: 'test@gmail.com'
        })
      }
    ]);
  },
  collection: jest.fn(),
  getFirestore: jest.fn(),
  setDoc() {
    return Promise.resolve({
      status: '200'
    });
  }
}));

beforeEach(() => {
  cleanup();
});

describe('Test Home Page', () => {
  test('Movie list should render empty text', () => {
    render(<HomeMovieList />);
    expect(screen.getByText('No movies found')).toBeInTheDocument();
  });

  test('Video data', async () => {
    let movies: Movie[] = [];
    const setMovies: any = jest.fn((data) => (movies = data));

    render(
      <MoviesContext.Provider value={{ movies, setMovies, appLoading: false, user: null }}>
        <HomePage />
      </MoviesContext.Provider>
    );
    await waitFor(() => {
      expect(setMovies).toHaveBeenCalled();
    });
  });

  test('HomeMovieItem Test', () => {
    let movie: Movie = {
      id: '1',
      title: 'Demo',
      url: 'https://www.youtube.com/embed/id',
      description: 'Description',
      sharedBy: 'test@gmail.com'
    };

    render(<HomeMovieItem movie={movie} />);
    expect(screen.getByTestId('movieIframe')).toBeInTheDocument();
    expect(screen.getByText(/Demo/i)).toBeInTheDocument();
    expect(screen.getByTestId('description')).toHaveTextContent(movie.description);
  });

  test('HomeMovieList Test', () => {
    let movies: Movie[] = [
      {
        id: '1',
        title: 'Video 1',
        url: 'https://www.youtube.com/embed/id',
        description: 'Description',
        sharedBy: 'test@gmail.com'
      },
      {
        id: '2',
        title: 'Video 2',
        url: 'https://www.youtube.com/embed/id2',
        description: 'Description2',
        sharedBy: 'test2@gmail.com'
      }
    ];

    const { container } = render(
      <MoviesContext.Provider
        value={{ movies, setMovies: jest.fn(), appLoading: false, user: null }}
      >
        <HomeMovieList />
      </MoviesContext.Provider>
    );
    expect(screen.getByTestId('homeMovieList')).toBeInTheDocument();
    expect(container.firstChild).toMatchSnapshot();
  });
});
