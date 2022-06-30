import { FormEventHandler, useContext, useMemo, useState } from 'react';
import { Popover } from '@headlessui/react';
import { LockClosedIcon, MailIcon } from '@heroicons/react/solid';
import { MoviesContext } from '../App';
import { auth } from '../utils/firebase';
import { loginRegister } from '../utils/services';
import { Link } from 'react-router-dom';

export const Header = () => {
  const { user } = useContext(MoviesContext);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully');
      window.location.reload();
    } catch (error) {
      setLoading(false);
      alert('Logout failed');
    }
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setLoading(true);
    await loginRegister(email.trim(), password);
    setLoading(false);
  };

  const renderActions = () =>
    user ? (
      <div className="max-w-4xl">
        <span className="truncate font-base">Welcome {user.email}</span>
        <Link
          to="/share"
          className="ml-3 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Share a movie
        </Link>

        <button
          onClick={onLogout}
          className="ml-3 inline-flex items-center px-4 py-1 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? 'Loading...' : 'Logout'}
        </button>
      </div>
    ) : (
      <form
        onSubmit={handleSubmit}
        className="hidden md:flex items-center justify-end md:flex-1 lg:w-0"
      >
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Email"
          />
        </div>
        <div className="ml-3 relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <LockClosedIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
            placeholder="Password"
          />
        </div>
        <button
          disabled={loading}
          type="submit"
          className="ml-3 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Login/Register
        </button>
      </form>
    );

  return (
    <Popover className="relative bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <Link to="/" className="flex flex-row items-center">
              <span className="sr-only">React Movies App</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
              <h1 className="text-xl ml-2">Funny Movies</h1>
            </Link>
          </div>
          {renderActions()}
        </div>
      </div>
    </Popover>
  );
};
