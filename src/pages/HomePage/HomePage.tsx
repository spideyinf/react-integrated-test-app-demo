import { FC, useContext, useEffect, useState } from 'react';
import { MoviesContext } from '../../App';
import { getMovies } from '../../utils/services';
import { HomeMovieList } from './HomeMovieList';

const HomePage: FC = () => {
  const [loading, setLoading] = useState(false);
  const { movies, setMovies } = useContext(MoviesContext);

  useEffect(() => {
    if (!movies.length) setLoading(true);
    (async () => {
      const data = await getMovies();
      setMovies(data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <h2 className="text-center pt-12 text-xl">Loading...</h2>;

  return <HomeMovieList />;
};

export default HomePage;
