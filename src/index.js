import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { RootRouter } from './router';
import registerServiceWorker from './registerServiceWorker';

import 'core-js/es6';

ReactDOM.render(<RootRouter />, document.getElementById('root'));
registerServiceWorker();
