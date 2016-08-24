import {
    INITIALIZE_APP,
    INITIALIZE_APP_COMPLETED,
    INITIALIZE_APP_FAILED,
    UPDATE_CURRENT_LOCATION,
    UPDATE_CURRENT_LOCATION_COMPLETED,
    SEARCH_GROUP,
    CREATE_GROUP,
    CREATE_GROUP_COMPLETED,
    WATCHING_GROUP,
    CHANGE_PROFILE_NAME,
    UPDATE_PROFILE,
    WATCHING_LOCATION,
    STOP_WATCHING_LOCATION
} from './RootActionTypes';

export function initializeApp() {
    return {
        type: INITIALIZE_APP
    };
}

export function initializeAppCompleted(payload) {
    return {
        type: INITIALIZE_APP_COMPLETED,
        payload: payload
    };
}

export function initializeAppFailed(payload) {
    return {
        type: INITIALIZE_APP_FAILED,
        payload: payload
    }
}

export function updateCurrentLocation() {
    return {
        type: UPDATE_CURRENT_LOCATION
    }
}

export function updateCurrentLocationCompleted(payload) {
    return {
        type: UPDATE_CURRENT_LOCATION_COMPLETED,
        payload: payload
    }
}

export function searchGroup(payload) {
    return {
        type: SEARCH_GROUP,
        payload: payload
    }
}

export function createGroup(payload) {
    return {
        type: CREATE_GROUP,
        payload: payload
    }
}

export function createGroupCompleted(payload) {
    return {
        type: CREATE_GROUP_COMPLETED,
        payload: payload
    }
}

export function watchingGroup(payload) {
    return {
        type: WATCHING_GROUP,
        payload: payload
    }
}

export function changeProfileName(payload) {
    return {
        type: CHANGE_PROFILE_NAME,
        payload: payload
    }
}

export function updateProfile(payload) {
    return {
        type: UPDATE_PROFILE,
        payload: payload
    }
}

export function watchingLocation() {
    return {
        type: WATCHING_LOCATION
    }
}

export function stopWatchingLocation() {
    return {
        type: STOP_WATCHING_LOCATION
    }
}




