import React, { useState } from 'react';

const LocalContext = React.createContext();

function LocalContextProvider({ children }) {
  // const API_URL = 'http://localhost:8000';
  const API_URL = 'https://api.kinesis.world';

  const [posts, setPosts] = useState([]);

  return (
    <LocalContext.Provider
      value={{
        API_URL,
        posts,
        setPosts,
      }}
    >
      {children}
    </LocalContext.Provider>
  );
}

export { LocalContext, LocalContextProvider };
