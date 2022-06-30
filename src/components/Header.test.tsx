import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { MoviesContext } from '../App';
import { Header } from './Header';

beforeEach(() => {
  cleanup();
});

describe('Test Home Page', () => {
  test('User has not logged in', async () => {
    render(
      <BrowserRouter>
        <MoviesContext.Provider
          value={{
            movies: [],
            setMovies: jest.fn(),
            appLoading: false,
            user: null
          }}
        >
          <Header />
        </MoviesContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  test('User has logged in and header show Logout option', async () => {
    const user = {
      email: 'test@gmail.com'
    };

    render(
      <BrowserRouter>
        <MoviesContext.Provider
          value={{
            movies: [],
            setMovies: jest.fn(),
            appLoading: false,
            user
          }}
        >
          <Header />
        </MoviesContext.Provider>
      </BrowserRouter>
    );

    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    expect(screen.getByText(/Welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/Share a movie/i)).toBeInTheDocument();
  });
});
