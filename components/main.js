// Main
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
// Styles
import '../sass/main.sass';

ReactDOM.render(<BrowserRouter><App /></BrowserRouter> ,document.getElementById('app'));