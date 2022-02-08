import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

import LoginWrapper from './wrappers/LoginWrapper.jsx';

import Feed from './pages/Feed.jsx';
import Homepage from './pages/Homepage.jsx';
import Hello from './pages/Hello.jsx';

import './assets/css/blinker.css';

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route exact path="/" element={<Homepage />} />

        <Route
          exact
          path="/protected"
          element={
            <LoginWrapper>
              {/* <Navbar /> */}
              <Feed />
            </LoginWrapper>
          }
        />

        <Route exact path="/loading" element={<LoginWrapper onlyLoad />} />

        <Route exact path="/hello/:name" element={<Hello />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
