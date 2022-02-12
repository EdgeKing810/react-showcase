import axios from 'axios';
import React, { useEffect, useState } from 'react';

import ParticlesBg from 'particles-bg';

import useLanguage from '../wrappers/LanguageWrapper';

export default function LanguageTheme() {
  const [theme, setTheme] = useState('dark');
  const [posts, setPosts] = useState([]);
  const [language, setLanguage] = useState('en');

  const terms = useLanguage(language).test;

  const changeTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const fetchPosts = () => {
    const rand = Math.floor(Math.random() * 100);

    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${rand}/comments`)
      .then(async (response) => {
        if (response.data) {
          setPosts([...response.data.slice(0, 3)]);
        } else {
          console.log(response.data);
        }
      });
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  const makeLangButton = (name, code, noLeft, noRight) => (
    <button
      className={`font-gilroy tracking-wide ${
        language === code
          ? theme === 'light'
            ? 'text-main-400'
            : 'text-main-200'
          : 'text-main-300'
      } text-opacity-75 flex items-center justify-center ${
        theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
      }
border-2 border-transparent rounded-lg ${noLeft && 'rounded-l-none'} ${
        noRight && 'rounded-r-none'
      } py-2 w-full
outline-none hover:border-main-300 ease-in-out duration-400`}
      onClick={() => setLanguage(code)}
    >
      {name}
    </button>
  );

  return (
    <div
      className={`w-full ${
        theme === 'light' ? 'bg-main-100' : 'bg-main-900'
      } p-8 lg:px-56 ease-in-out duration-400 h-screen`}
    >
      <div className="text-main-300 w-full text-3xl sm:text-4xl font-semibold font-gilroy">
        Language / Theme
      </div>

      <button
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        type="button"
        onClick={() => changeTheme()}
        className={`text-center text-sm border-2 border-transparent flex duration-400 ease-in-out justify-center items-center bg-gray-800 text-gray-200 hover:border-main-300 focus:border-main-300 hover:opacity-80 focus:opacity-80 font-gilroy rounded-lg p-3 mt-4 w-full lg:w-48`}
      >
        <div className="mr-2">
          Switch to {theme === 'light' ? 'dark' : 'light'} mode
        </div>

        <div
          className={`flex items-center ${
            theme === 'light' ? 'text-gray-300' : 'text-yellow-300'
          } ${theme === 'light' ? 'ri-moon-fill' : 'ri-sun-fill'}`}
        ></div>
      </button>

      <div className="w-full flex mt-2">
        {makeLangButton(terms.english, 'en', false, true)}
        {makeLangButton(terms.french, 'fr', true, true)}
        {makeLangButton(terms.creole, 'mu', true, false)}
      </div>

      <div
        className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan my-4 ${
          theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
        } p-2 rounded-lg pt-2 ease-in-out duration-400`}
      >
        {terms.welcome}
      </div>

      <div
        className={`w-full rounded-lg h-40 ${
          theme === 'dark' ? 'bg-main-900' : 'bg-main-100'
        } z-0 left-0 top-0 my-2 ease-out duration-400`}
      >
        <ParticlesBg type="color" bg={false} />
      </div>

      <div className="w-full my-4 flex flex-col sm:grid grid-cols-2 lg:grid-cols-3 lg:justify-start gap-2 lg:gap-8 lg:pb-0 mb-4">
        {posts.map((p) => (
          <div
            key={`post-${p.postId}-${p.id}`}
            className={`lg:h-64 ${
              theme === 'light' ? 'bg-gray-200' : 'bg-gray-800'
            } rounded-lg lg:mb-0 mb-2 p-2 hover:border-main-300 border-4 border-transparent duration-400 ease-in-out`}
          >
            <div className="text-main-200 w-full text-base sm:text-lg font-gilroy uppercase lg:h-14">
              {p.name}
            </div>

            <div
              className={`text-gray-300 w-full text-xs sm:text-sm font-normal font-spartan my-1 lg:h-32 ${
                theme === 'light' ? 'bg-gray-100' : 'bg-gray-900'
              } p-2 rounded-lg duration-400 ease-in-out`}
            >
              {p.body}
            </div>

            <div
              className={`text-main-300 w-full text-xs sm:text-sm font-normal font-spartan mt-2`}
            >
              {p.email}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
