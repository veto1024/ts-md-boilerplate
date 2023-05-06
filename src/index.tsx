import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
export * from './components';
export * from './api';
export * from './utils';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container as HTMLElement);
root.render(<App />);
