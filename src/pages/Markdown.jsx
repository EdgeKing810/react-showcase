import React, { useContext, useState } from 'react';

import MDEditor, { commands } from '@uiw/react-md-editor';
import { useAlert } from 'react-alert';

import { LocalContext } from '../wrappers/LocalContext';

import { handleImage } from '../utils/handleImage';

import Parser from '../processors/markdownEngine';

export default function Markdown() {
  const [content, setContent] = useState('');
  const [showPreview, setShowPreview] = useState(false);

  const alert = useAlert();
  const { API_URL } = useContext(LocalContext);

  return (
    <div className={`w-full bg-main-900 p-8 lg:px-56 ease-in-out duration-400`}>
      <div className="text-main-300 w-full text-3xl sm:text-4xl font-semibold font-gilroy">
        Markdown Editor / Preview
      </div>

      <div className="my-4 w-full lg:w-1/2 flex">
        <button
          className={`p-2 w-1/2 justify-center font-gilroy tracking-wide text-main-200 text-opacity-75 flex items-center bg-gray-800 border-2 border-transparent rounded-lg outline-none hover:border-main-200 focus:border-main-200 ease-in-out duration-400`}
          onClick={() => setShowPreview(false)}
        >
          Editor
        </button>

        <button
          className={`p-2 ml-2 w-1/2 justify-center font-gilroy tracking-wide text-main-300 text-opacity-75 flex items-center bg-gray-800 border-2 border-transparent rounded-lg outline-none hover:border-main-300 focus:border-main-300 ease-in-out duration-400`}
          onClick={() => setShowPreview(true)}
        >
          Preview
        </button>
      </div>

      <div
        className={`w-full rounded-lg bg-main-100 ease-in-out duration-400 transform ${
          showPreview ? 'translate-x-full hidden' : ''
        }`}
      >
        <MDEditor
          value={content}
          onChange={setContent}
          visiableDragbar={true}
          preview="edit"
          minHeight="500"
          className="mb-2"
          autoFocus={true}
          extraCommands={[
            commands.group([], {
              name: 'upload-image',
              groupName: 'upload-image',
              icon: (
                <svg viewBox="0 0 1024 1024" width="12" height="12">
                  <path
                    fill="currentColor"
                    d="M716.8 921.6a51.2 51.2 0 1 1 0 102.4H307.2a51.2 51.2 0 1 1 0-102.4h409.6zM475.8016 382.1568a51.2 51.2 0 0 1 72.3968 0l144.8448 144.8448a51.2 51.2 0 0 1-72.448 72.3968L563.2 541.952V768a51.2 51.2 0 0 1-45.2096 50.8416L512 819.2a51.2 51.2 0 0 1-51.2-51.2v-226.048l-57.3952 57.4464a51.2 51.2 0 0 1-67.584 4.2496l-4.864-4.2496a51.2 51.2 0 0 1 0-72.3968zM512 0c138.6496 0 253.4912 102.144 277.1456 236.288l10.752 0.3072C924.928 242.688 1024 348.0576 1024 476.5696 1024 608.9728 918.8352 716.8 788.48 716.8a51.2 51.2 0 1 1 0-102.4l8.3968-0.256C866.2016 609.6384 921.6 550.0416 921.6 476.5696c0-76.4416-59.904-137.8816-133.12-137.8816h-97.28v-51.2C691.2 184.9856 610.6624 102.4 512 102.4S332.8 184.9856 332.8 287.488v51.2H235.52c-73.216 0-133.12 61.44-133.12 137.8816C102.4 552.96 162.304 614.4 235.52 614.4l5.9904 0.3584A51.2 51.2 0 0 1 235.52 716.8C105.1648 716.8 0 608.9728 0 476.5696c0-132.1984 104.8064-239.872 234.8544-240.2816C258.5088 102.144 373.3504 0 512 0z"
                  />
                </svg>
              ),
              children: () => {
                return <div></div>;
              },
              execute: () => {
                handleImage(alert, API_URL, setContent);
              },
              buttonProps: { 'aria-label': 'Insert title' },
            }),
          ]}
        />
      </div>

      <div
        className={`w-full rounded-lg bg-gray-800 text-gray-100 ease-in-out duration-400 transform ${
          !showPreview ? 'translate-x-full hidden' : ''
        }`}
      >
        <div className="flex w-full items-center p-2">
          <Parser>{content}</Parser>
        </div>
      </div>
    </div>
  );
}
