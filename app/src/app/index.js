import "babel-polyfill";
import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root';
import configureStore from './stores/configureStore';

import db from './utils/db';

const TARGET_EL = document.getElementById('main');

const store = configureStore();

db.init(() => {
    ReactDOM.render(
        <Root store={store}/>,
        TARGET_EL
    );
});

