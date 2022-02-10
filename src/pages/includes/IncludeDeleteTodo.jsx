import React from 'react';

import { FullAbsoluteContainer } from './FullAbsoluteContainer';

export default function IncludeDeleteTodo({
  deletingTodo,
  setDeletingTodo,
  submitDeleteTodo,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:px-4 lg:-mt-4 lg:pt-0 ${
        deletingTodo ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setDeletingTodo('')}
      theme={'dark'}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <div
          className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan mt-2 mb-2 text-left`}
        >
          Are you sure that you want to delete this Todo?
        </div>

        <button
          onClick={() => setDeletingTodo('')}
          className={`text-center text-lg border-2 border-transparent flex justify-center items-center bg-gray-900 text-main-300 hover:border-main-300 focus:border-main-300 hover:opacity-80 focus:opacity-80 font-gilroy ml-3 px-2 my-3 rounded-lg ease-in-out duration-400`}
        >
          <div className={`h-full flex items-center ri-close-line`}></div>
        </button>
      </div>

      <div className="w-full flex justify-center mt-2">
        <button
          className={`uppercase py-2 w-1/2 lg:w-1/4 justify-center font-gilroy tracking-wide text-red-300 text-opacity-75 flex items-center bg-gray-800 border-2 border-transparent rounded-lg outline-none hover:border-red-300 focus:border-red-300 ease-in-out duration-400`}
          onClick={() => submitDeleteTodo()}
        >
          Yes
        </button>

        <button
          className={`uppercase py-2 ml-4 w-1/2 lg:w-1/4 justify-center font-gilroy tracking-wide text-green-300 text-opacity-75 flex items-center bg-gray-800 border-2 border-transparent rounded-lg outline-none hover:border-green-300 focus:border-green-300 ease-in-out duration-400`}
          onClick={() => setDeletingTodo('')}
        >
          No
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
