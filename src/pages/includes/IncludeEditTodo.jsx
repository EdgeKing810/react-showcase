import React from 'react';

import { FullAbsoluteContainer } from './FullAbsoluteContainer';

export default function IncludeEditTodo({
  editingTodo,
  setEditingTodo,
  title,
  setTitle,
  description,
  setDescription,
  submitUpdateTodo,
}) {
  return (
    <FullAbsoluteContainer
      additional={`w-screen h-screen top-0 left-0 lg:px-4 lg:-mt-4 lg:pt-0 ${
        editingTodo ? 'translate-y-0' : 'translate-y-full'
      }`}
      additionalIn="flex flex-col items-center justify-center"
      outFunction={() => setEditingTodo('')}
      theme={'dark'}
    >
      <div className="flex w-full lg:w-1/2 justify-between items-center">
        <div
          className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan mt-2 mb-2 text-left`}
        >
          Update Todo
        </div>

        <button
          onClick={() => setEditingTodo('')}
          className={`text-center text-lg border-2 border-transparent flex justify-center items-center bg-gray-900 text-main-300 hover:border-main-300 focus:border-main-300 hover:opacity-80 focus:opacity-80 font-gilroy ml-3 px-2 my-3 rounded-lg ease-in-out duration-400`}
        >
          <div className={`h-full flex items-center ri-close-line`}></div>
        </button>
      </div>

      <div className="w-full lg:w-1/2 p-2 border-2 border-main-300 rounded-lg mt-2 border-opacity-50">
        <input
          type="text"
          name="Enter Title"
          title="Enter Title"
          className={`w-full outline-none rounded-lg p-2 text-gray-100 border-gray-100 border-2 border-opacity-50 ease-in-out duration-400
    text-xs sm:text-base opacity-85 hover:opacity-95 focus:opacity-95 bg-gray-900 font-spartan placeholder-gray-200`}
          placeholder="Enter a title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          type="text"
          name="Enter Description"
          title="Enter Description"
          className={`mt-2 w-full outline-none rounded-lg p-2 text-gray-100 border-gray-100 border-2 border-opacity-50 ease-in-out duration-400
    text-xs sm:text-base opacity-85 hover:border-opacity-95 focus:border-opacity-95 bg-gray-900 font-spartan placeholder-gray-200 min-h-20`}
          placeholder="Enter a description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="w-full lg:w-1/2 mt-4">
        <button
          title="Update Todo"
          className={`justify-center p-2 mt-2 w-full font-gilroy tracking-wide text-blue-300 flex items-center bg-gray-800 border-2 border-transparent
          rounded-lg outline-none ${
            title.trim() && description.trim()
              ? 'hover:border-blue-300 focus:border-blue-300'
              : 'opacity-50'
          } ease-in-out duration-400`}
          onClick={() =>
            title.trim() && description.trim() ? submitUpdateTodo() : null
          }
        >
          Submit
        </button>
      </div>
    </FullAbsoluteContainer>
  );
}
