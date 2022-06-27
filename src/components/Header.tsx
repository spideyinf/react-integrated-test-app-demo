import { Popover } from '@headlessui/react';
import { LockClosedIcon, MailIcon } from '@heroicons/react/solid';

export const Header = () => {
  return (
    <Popover className="relative bg-gray-50">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a className="flex flex-row items-center" href="/">
              <span className="sr-only">React Movies App</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                alt=""
              />
              <h1 className="text-xl ml-2">Funny Movies</h1>
            </a>
          </div>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MailIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              </div>
              <input
                required
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
                type="password"
                name="password"
                id="password"
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                placeholder="Password"
              />
            </div>
            <a
              href="/login"
              className="ml-3 whitespace-nowrap inline-flex items-center justify-center px-4 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Login/Register
            </a>
          </div>
        </div>
      </div>
    </Popover>
  );
};
