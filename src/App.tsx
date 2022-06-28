import React, { createContext, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SharePage from './pages/SharePage';
import { getMovies } from './utils/services';
import { Movie, MovieContextData } from './utils/types';

export const MoviesContext = createContext<MovieContextData>({
  movies: [],
  user: null,
  appLoading: true,
  setMovies: () => null
});

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [appLoading, setAppLoading] = useState(true);
  const [user, setUser] = useState<any>(1);

  return (
    <React.Suspense fallback={null}>
      <MoviesContext.Provider
        value={{
          movies,
          setMovies: (data: Movie[]) => setMovies(data),
          appLoading,
          user
        }}
      >
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/share" element={<SharePage />} />
            <Route path="/*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </MoviesContext.Provider>
    </React.Suspense>
  );
}

export default App;
