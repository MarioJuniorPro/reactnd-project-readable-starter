import React from 'react';
import ReactDOM from 'react-dom';
// import './css/reset.css';
// import './css/index.css';
import 'semantic-ui-css/semantic.min.css';

import Root from './Root';
// import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore'

const store = configureStore();

ReactDOM.render(<Root store={store} />, document.getElementById('root'));
// registerServiceWorker();
