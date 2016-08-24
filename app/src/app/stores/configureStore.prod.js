import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Reducers';

import createSagaMiddleware from 'redux-saga';
import sagas from '../saga/RootSagas';

const reducer = combineReducers({
    root: rootReducer
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(thunk, sagaMiddleware)
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    // then run the saga
    sagaMiddleware.run(sagas);
    return store;
}