import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/Reducers';

import createSagaMiddleware from 'redux-saga';
import sagas from '../saga/RootSagas';

import DevTools from '../dev/DevTools';

import LocalstorageMiddleware from '../middleware/LocalstorageMiddleware';

const reducer = combineReducers({
    root: rootReducer
});

const logger = createLogger({
    stateTransformer(state) {
        return state.root.toJS();
    }
});

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const enhancer = compose(
    applyMiddleware(LocalstorageMiddleware),
    applyMiddleware(thunk, logger, sagaMiddleware),
    DevTools.instrument()
);

export default function configureStore(initialState) {
    const store = createStore(reducer, initialState, enhancer);
    // then run the saga
    sagaMiddleware.run(sagas);
    return store;
}