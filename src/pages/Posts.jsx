import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import PaginationList from '../wrappers/PaginationList';
import { LocalContext } from '../wrappers/LocalContext';

export default function Posts() {
  const limit = 12;
  const [currentPage, setCurrentPage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const { posts, setPosts } = useContext(LocalContext);

  const fetchPosts = (offset, currentPosts) => {
    axios
      .get(
        // `${API_URL}/profile/fetch?offset=${offset}&limit=30`,
        `https://jsonplaceholder.typicode.com/posts/${offset}/comments`
        // { uid: uid },
        // {
        //   headers: { Authorization: `Bearer ${jwt}` },
        // }
      )
      .then(async (response) => {
        setTimeout(async () => {
          if (response.data) {
            setPosts([...currentPosts]);
            //   if (currentPosts.length < response.data.amount) {
            if (currentPosts.length < 108) {
              if (isLoading && currentPosts.length > limit) {
                setIsLoading(false);
              }

              await fetchPosts(offset + 1, [...currentPosts, ...response.data]);
            }
          } else {
            console.log(response.data);
          }
        }, 250);
      });
  };

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const asyncFetchPosts = async () => {
      await fetchPosts(0, posts);
    };

    asyncFetchPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div
      className={`w-full bg-main-900 p-2 lg:p-8 lg:px-56 ease-in-out duration-400 lg:overflow-y-hidden`}
    >
      <div className="text-main-300 w-full text-3xl sm:text-4xl font-semibold font-gilroy mb-2">
        Posts
      </div>

      {isLoading && (
        <div
          className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan my-4 text-left blink`}
        >
          Loading...
        </div>
      )}

      {posts && posts.length > limit && (
        <div className="w-full bg-gray-700 bg-opacity-50 rounded-lg mt-2">
          <PaginationList
            limit={limit}
            amount={posts ? posts.length : 0}
            setter={setCurrentPage}
            additional="mb-2"
          />
        </div>
      )}

      <div className="w-full my-4 flex flex-col sm:grid grid-cols-2 lg:grid-cols-3 lg:justify-start gap-2 lg:gap-8 lg:overflow-y-scroll lg:h-200 lg:pr-2 lg:pb-0">
        {posts &&
          posts.length > limit &&
          posts
            .slice(currentPage * limit, currentPage * limit + limit)
            .map((p) => (
              <div
                key={`post-${p.postId}-${p.id}`}
                className="lg:h-64 bg-gray-800 rounded-lg lg:mb-0 mb-2 p-2 hover:border-main-300 border-4 border-transparent duration-400 ease-in-out"
              >
                <div className="text-main-200 w-full text-base sm:text-lg font-gilroy uppercase lg:h-14">
                  {p.name}
                </div>

                <div
                  className={`text-gray-300 w-full text-xs sm:text-sm font-normal font-spartan my-1 lg:h-32 bg-gray-900 p-2 rounded-lg`}
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
