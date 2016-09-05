import {takeEvery} from 'redux-saga';
import {put, call, select} from 'redux-saga/effects';
import map from '../utils/map';
import db from '../utils/db';
import utils from '../utils/utils';

import {
    INITIALIZE_APP,
    UPDATE_CURRENT_LOCATION,
    SEARCH_GROUP,
    CREATE_GROUP,
    WATCHING_GROUP,
    UPDATE_PROFILE,
} from '../actions/RootActionTypes';
import {SHOW_MESSAGE} from '../actions/CommonActionTypes';
import {
    initializeAppCompleted,
    initializeAppFailed,
    updateCurrentLocationCompleted,
    updateProfile,
    createGroup,
    createGroupCompleted,
    watchingGroup,
    watchingLocation
} from '../actions/RootActions';
import {
    busy,
    busyCompleted,
    showMessage,
    hideMessage
} from '../actions/CommonActions';

const getProfile = state => state.root.get('app').toJS();

function* handleInitializeApp() {
    try {
        yield put(busy());
        yield call(map.setup);
        yield put(initializeAppCompleted());
        yield put(busyCompleted());
    } catch (e) {
        yield put(initializeAppFailed());
        yield put(busyCompleted());
    }
}

function* handleShowMessage() {
    yield call(utils.delayForSeconds, 2); // hide the message box after 2s
    yield put(hideMessage());
}

function* handleUpdateCurrentLocation() {
    yield put(showMessage({message: 'Updating location...'}));
    let location = yield call(map.updateCurrentLocation);
    yield put(updateCurrentLocationCompleted(location));
    const profile = yield select(getProfile);
    yield put(updateProfile(profile));
}

function* handleSearchGroup({payload}) {
    yield put(busy());
    let group = yield call(db.searchGroup, payload.groupTag);
    if (group) {
        yield put(watchingGroup(group));
        yield put(watchingLocation());
    } else {
        yield put(createGroup({groupTag: payload.groupTag}))
    }
    yield put(busyCompleted());
}

function* handleCreateGroup({payload}) {
    yield put(busy());
    let group = yield call(db.createGroup, payload.groupTag);
    if (group) {
        yield put(createGroupCompleted(group));
        yield put(watchingGroup(group));
        yield put(watchingLocation());
    } else {
        yield put(showMessage({message: 'Create group failed, Please try again!'}));
    }
    yield put(busyCompleted());
}

function* handleWatchingGroup({payload}) {
    yield call(db.watchGroup, payload);
}

function* handleUpdateProfile({payload}) {
    yield call(db.updateProfile, payload)
}

// watch initialize action
export function* watchInitializeApp() {
    yield* takeEvery(INITIALIZE_APP, handleInitializeApp);
}

export function* watchShowMessage() {
    yield* takeEvery(SHOW_MESSAGE, handleShowMessage)
}

export function* watchUpdateCurrentLocation() {
    yield* takeEvery(UPDATE_CURRENT_LOCATION, handleUpdateCurrentLocation)
}

export function* watchSearchGroup() {
    yield* takeEvery(SEARCH_GROUP, handleSearchGroup)
}

export function* watchCreateGroup() {
    yield* takeEvery(CREATE_GROUP, handleCreateGroup)
}

export function* watchWatchingGroup() {
    yield* takeEvery(WATCHING_GROUP, handleWatchingGroup)
}

export function* watchUpdateProfile() {
    yield* takeEvery(UPDATE_PROFILE, handleUpdateProfile)
}

export default function* root() {
    yield [
        watchInitializeApp(),
        watchUpdateCurrentLocation(),
        watchShowMessage(),
        watchSearchGroup(),
        watchCreateGroup(),
        watchWatchingGroup(),
        watchUpdateProfile()
    ]
}
