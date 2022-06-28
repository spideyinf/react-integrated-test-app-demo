import { FC, useState } from 'react';

const SharePage: FC = () => {
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => null;

  if (loading) return <h2 className="text-center pt-12 text-xl">Loading...</h2>;

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-16 mx-auto max-w-xl bg-white border-gray-200 relative border-2 px-8 py-12 rounded-md space-y-4 flex flex-col justify-end"
    >
      <h2 className="rounded-md bg-white px-3 text-xl absolute -top-3 left-4">
        Share a Youtube movie
      </h2>
      <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start">
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          Youtube URL:
        </label>
        <div className="mt-1 sm:mt-0 sm:col-span-2">
          <input
            type="text"
            name="url"
            id="url"
            className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            placeholder="youtube.com/watch?v=..."
          />
          <button
            type="button"
            className="max-w-lg w-full mt-5 inline-flex justify-center items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Share
          </button>
        </div>
      </div>
    </form>
  );
};

export default SharePage;
