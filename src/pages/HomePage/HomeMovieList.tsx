import { FC, useContext } from 'react';
import { MoviesContext } from '../../App';
import HomeMovieItem from './HomeMovieItem';

export const HomeMovieList: FC = () => {
  const { movies } = useContext(MoviesContext);

  return (
    <ul className="flex flex-col items-center pt-8 space-y-8">
      {movies.length > 0 ? (
        movies.map((movie) => <HomeMovieItem key={movie.id} movie={movie} />)
      ) : (
        <h2 className="text-center pt-12 text-xl">No movies found</h2>
      )}
    </ul>
  );
};
