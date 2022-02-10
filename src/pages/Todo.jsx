import React, { useCallback, useEffect, useState } from 'react';

import { useAlert } from 'react-alert';
import { v4 } from 'uuid';

import { useTodoStore } from '../stores/useTodoStore';

import IncludeEditTodo from './includes/IncludeEditTodo';
import IncludeDeleteTodo from './includes/IncludeDeleteTodo';

export default function Todos() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const [editingTodo, setEditingTodo] = useState('');
  const [deletingTodo, setDeletingTodo] = useState('');

  const alert = useAlert();

  const { todos, setTodos, addTodo, updateTodo, deleteTodo, toggleTodo } =
    useTodoStore((state) => state);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setEditingTodo('');
      setDeletingTodo('');
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  const fetchTodos = () => {
    let currentTodos = JSON.parse(localStorage.getItem('_todos'));

    if (currentTodos && currentTodos.todos) {
      setTodos(currentTodos.todos);
    }

    setIsLoading(false);
  };

  const saveTodos = () => {
    const currentTodos = useTodoStore.getState().todos;

    console.log(currentTodos);
    localStorage.setItem(
      '_todos',
      JSON.stringify({ todos: [...currentTodos] })
    );
  };

  useEffect(() => {
    let timer = setTimeout(() => setIsLoading(false), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setEditingTodo('');

    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const createTodo = () => {
    addTodo(v4(), title, description);
    setTitle('');
    setDescription('');
    alert.success('Todo successfully created!');

    saveTodos();
  };

  const submitUpdateTodo = () => {
    updateTodo(editingTodo, title, description);
    setTitle('');
    setDescription('');
    setEditingTodo('');
    alert.success('Todo successfully updated!');

    saveTodos();
  };

  const submitDeleteTodo = () => {
    deleteTodo(deletingTodo);
    setDeletingTodo('');
    alert.success('Todo successfully deleted!');

    saveTodos();
  };

  return (
    <div
      className={`w-full bg-main-900 p-2 lg:p-8 lg:px-56 ease-in-out duration-400 lg:overflow-y-hidden`}
    >
      <div className="text-main-300 w-full text-3xl sm:text-4xl font-semibold font-gilroy mb-2">
        Todos
      </div>

      <div className="w-full lg:w-2/3 p-2 border-2 border-main-300 rounded-lg mt-2 border-opacity-50">
        <div
          className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan mt-2 mb-2 text-left`}
        >
          Create A Todo
        </div>

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

        <button
          title="Add Todo"
          className={`justify-center p-2 mt-2 w-full font-gilroy tracking-wide text-blue-300 flex items-center bg-gray-800 border-2 border-transparent
          rounded-lg outline-none ${
            title.trim() && description.trim()
              ? 'hover:border-blue-300 focus:border-blue-300'
              : 'opacity-50'
          } ease-in-out duration-400`}
          onClick={() =>
            title.trim() && description.trim() ? createTodo() : null
          }
        >
          Add Todo
        </button>
      </div>

      {isLoading && (
        <div
          className={`text-main-200 w-full text-xl lg:text-2xl font-semibold font-spartan my-4 text-left blink`}
        >
          Loading...
        </div>
      )}

      <div className="lg:w-2/3 w-full my-4 flex flex-col lg:justify-start gap-2 lg:gap-8 lg:overflow-y-scroll lg:h-120 lg:pr-2 lg:pb-0">
        {todos &&
          todos.map((t) => (
            <div
              key={`todo-${t.todoID}`}
              className={`bg-gray-800 rounded-lg lg:mb-0 mb-2 p-2 border-4 ${
                t.completed ? 'border-main-200' : 'border-red-400'
              } duration-400 ease-in-out`}
            >
              <div className="text-main-300 w-full text-base sm:text-lg font-gilroy uppercase lg:h-8">
                {t.title}
              </div>

              <div
                className={`text-gray-300 w-full text-xs sm:text-sm font-normal font-spartan my-1 bg-gray-900 bg-opacity-50 p-2 rounded-lg`}
              >
                {t.description}
              </div>

              <div className="w-full flex flex-col lg:flex-row lg:justify-between mt-2 lg:mt-4">
                <button
                  title={`Toggle Status`}
                  type="button"
                  onClick={() => toggleTodo(t.todoID)}
                  className={`text-center text-sm border-2 border-transparent flex duration-400 ease-in-out justify-center items-center bg-gray-900 text-gray-200
                hover:border-main-300 focus:border-main-300 hover:opacity-80 focus:opacity-80 font-gilroy rounded-lg p-3 mt-2 lg:mt-0 w-full`}
                >
                  <div className="mr-2 uppercase">
                    Mark as {t.completed ? 'not ' : ''}completed
                  </div>

                  <div
                    className={`flex items-center ${
                      t.completed ? 'text-red-400' : 'text-main-200'
                    } ${
                      t.completed
                        ? 'ri-checkbox-blank-line'
                        : 'ri-checkbox-fill'
                    }`}
                  ></div>
                </button>

                <button
                  title={`Edit`}
                  type="button"
                  onClick={() => {
                    setEditingTodo(t.todoID);
                    setTitle(t.title);
                    setDescription(t.description);
                  }}
                  className={`text-center text-sm border-2 border-transparent flex duration-400 ease-in-out justify-center items-center bg-gray-900 text-gray-200
                hover:border-main-300 focus:border-main-300 hover:opacity-80 focus:opacity-80 font-gilroy rounded-lg p-3 mt-2 lg:mt-0 lg:mx-2 w-full`}
                >
                  <div className="mr-2 uppercase">Edit</div>

                  <div
                    className={`flex items-center text-yellow-300 ri-pencil-line`}
                  ></div>
                </button>

                <button
                  title={`Delete`}
                  type="button"
                  onClick={() => setDeletingTodo(t.todoID)}
                  className={`text-center text-sm border-2 border-transparent flex duration-400 ease-in-out justify-center items-center bg-gray-900 text-gray-200
                hover:border-main-300 focus:border-main-300 hover:opacity-80 focus:opacity-80 font-gilroy rounded-lg p-3 mt-2 lg:mt-0 w-full`}
                >
                  <div className="mr-2 uppercase">Delete</div>

                  <div
                    className={`flex items-center text-red-400 ri-delete-bin-3-line`}
                  ></div>
                </button>
              </div>
            </div>
          ))}
      </div>

      <IncludeEditTodo
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        submitUpdateTodo={submitUpdateTodo}
      />

      <IncludeDeleteTodo
        deletingTodo={deletingTodo}
        setDeletingTodo={setDeletingTodo}
        submitDeleteTodo={submitDeleteTodo}
      />
    </div>
  );
}
