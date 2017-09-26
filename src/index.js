import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import jquery from 'jquery';
//import bootstrap from 'bootstrap';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/font-awesome/css/font-awesome.css'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
