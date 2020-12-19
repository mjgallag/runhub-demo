import { useState, useEffect } from 'react';

import { message } from 'shared';

import logo from './logo.svg';
import './App.css';

const backendUrl =
  window.RUNHUB_SERVICE_BACKEND_URL !== '__RUNHUB_SERVICE_BACKEND_URL__'
    ? window.RUNHUB_SERVICE_BACKEND_URL
    : 'http://localhost:4000';

function App() {
  const [backendMessage, setBackendMessage] = useState();

  useEffect(() => {
    async function fetchBackendMessage() {
      setBackendMessage(await (await fetch(`${backendUrl}/message`)).json());
    }
    fetchBackendMessage();
  });

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          <code>{message} ... from frontend</code>
        </p>
        <p>
          <code>{backendMessage} ... from backend</code>
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
