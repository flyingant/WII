import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import AppContainer from './AppContainer';

export default function Root(props) {
    return (
        <Provider store={props.store}>
            <div>
                <AppContainer />
            </div>
        </Provider>
    );
}

Root.propTypes = {
    store: PropTypes.object.isRequired
};