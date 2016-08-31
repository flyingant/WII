import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Reducers';

import createSagaMiddleware from 'redux-saga';
import sagas from '../saga/RootSagas';

import LocalstorageMiddleware from '../middleware/LocalstorageMiddleware';

const reducer = combineReducers({
    root: rootReducer
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(LocalstorageMiddleware),
    applyMiddleware(thunk, sagaMiddleware),
    persistState()
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    // then run the saga
    sagaMiddleware.run(sagas);
    return store;
}