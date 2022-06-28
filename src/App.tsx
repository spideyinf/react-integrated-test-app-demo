import React, { createContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import SharePage from './pages/SharePage';
import { getMovies } from './utils/services';
import { MovieContextData } from './utils/types';

export const MoviesContext = createContext<MovieContextData>({
  movies: [],
  user: null,
  appLoading: true,
  setMovies: () => null
});

function App() {
  return (
    <React.Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<SharePage />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </React.Suspense>
  );
}

export default App;
