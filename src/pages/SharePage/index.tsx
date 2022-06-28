import { FC, FormEventHandler, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoviesContext } from '../../App';
import { fetchVideoInformation, shareMovie } from '../../utils/services';

const SharePage: FC = () => {
  const { user } = useContext(MoviesContext);
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    if (url.trim()) {
      setLoading(true);
      const videoInformation = await fetchVideoInformation(url);
      if (!videoInformation) {
        setLoading(false);
        return alert('Invalid url');
      }

      const {
        id,
        snippet: { title, description }
      } = videoInformation.items[0];
      const data = {
        title,
        description,
        sharedBy: user.email,
        url: `https://www.youtube.com/embed/${id}`
      };
      try {
        await shareMovie(data);
        setLoading(false);
        navigate('/');
        alert('Share movie successfully');
      } catch (error) {
        alert('Share movie failed');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [navigate, user]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-24 mx-auto max-w-xl bg-white border-gray-200 relative border-2 px-8 py-8 rounded-md space-y-4 flex flex-col justify-end"
    >
      <h2 className="rounded-md bg-white px-3 text-xl absolute -top-3 left-4">
        Share a Youtube movie
      </h2>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
        <label htmlFor="url" className="block text-md font-medium text-gray-700 sm:mt-px sm:pt-2">
          Youtube URL:
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="text"
            name="url"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="youtube.com/watch?v=..."
          />
          <button
            disabled={loading}
            className="max-w-lg w-full mt-5 inline-flex justify-center items-center p-3 border border-transparent text-md leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? 'Loading...' : 'Share'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SharePage;
