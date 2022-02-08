import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Homepage() {
  const navigate = useNavigate();

  const makeListItem = (name, path) => (
    <li
      key={`li-${name.split(' ').join('').toLowerCase()}`}
      className={`text-gray-300 w-full text-sm sm:text-base font-normal font-spartan mb-1`}
    >
      <button
        className="hover:underline focus:underline"
        onClick={() => navigate(path)}
      >
        {name}
      </button>
    </li>
  );

  return (
    <div className={`w-full bg-main-900 p-8 lg:px-56 ease-in-out duration-400`}>
      <div className="text-main-300 w-full text-3xl sm:text-4xl font-semibold font-gilroy">
        Homepage
      </div>

      <div className={`pt-1 w-full bg-gray-500 my-4 rounded-lg opacity-50`} />

      <div
        className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan my-4`}
      >
        Navigation:
      </div>

      <ul className="list-disc list pl-8">
        {makeListItem('Auto-Login Loading Screen', '/loading')}
        {makeListItem('Protected', '/protected')}
        {makeListItem('Hello {Your Name}', '/hello/test')}
        {makeListItem('Paginated Posts', '/posts')}
        {makeListItem('Language / Theme', '/language-theme')}
      </ul>
    </div>
  );
}
