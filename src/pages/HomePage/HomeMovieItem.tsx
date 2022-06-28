import { FC } from 'react';
import { Movie } from '../../utils/types';

interface Props {
  movie: Movie;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const HomeMovieItem: FC<Props> = ({ movie }) => {
  return (
    <li key={movie.id} className="col-span-1 flex shadow-sm rounded-md">
      <iframe
        className={classNames(
          '',
          'flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
        )}
        src={movie.url}
        title={movie.title}
        height="240"
        width="360"
      />
      <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
        <div className="flex-1 px-4 py-2 truncate">
          <a href={movie.url} className="text-gray-900 text-2xl font-bold hover:text-gray-600">
            {movie.title}
          </a>
          <p className="text-gray-600">Shared by: {movie.sharedBy}</p>
          <p className="mt-2 text-lg">Description: </p>
          <p className="text-gray-500">{movie.description}</p>
        </div>
      </div>
    </li>
  );
};

export default HomeMovieItem;
