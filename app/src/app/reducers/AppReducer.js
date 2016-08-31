import Immutable from 'immutable';

import {
    CHANGE_PROFILE_NAME,
    WATCHING_GROUP,
    CREATE_GROUP_COMPLETED,
    UPDATE_CURRENT_LOCATION_COMPLETED,
    WATCHING_LOCATION,
    STOP_WATCHING_LOCATION
} from '../actions/RootActionTypes';
import utils from '../utils/utils';

const uuid = utils.uuid();
const DEFAULT_APP_STATE = {
    ref: 'map', // map container default reference
    group_id: '',
    group_tag: '',
    profile_id: uuid,
    profile_name: 'Human_' + uuid.slice(0, 5),
    profile_lat: 0,
    profile_lng: 0,
    watching: false, // if current watching the location change
    delay: 20
};

function app(state, action) {
    let currentState = {};
    if (state) {
        currentState = state
    } else {
        const local_state = localStorage.getItem('redux');
        if(local_state) {
            currentState = Immutable.Map(JSON.parse(local_state).app)
        } else {
            currentState = Immutable.Map(DEFAULT_APP_STATE)
        }
    }
    switch (action.type) {
        case UPDATE_CURRENT_LOCATION_COMPLETED:
            return currentState.merge({
                profile_lat: action.payload.lat,
                profile_lng: action.payload.lng
            });
        case WATCHING_GROUP:
            return currentState.merge({
                group_id: action.payload.id,
                group_tag: action.payload.tag
            });
        case CREATE_GROUP_COMPLETED:
            return currentState.merge({
                group_id: action.payload.id,
                group_tag: action.payload.tag
            });
        case CHANGE_PROFILE_NAME:
            return currentState.merge({
                profile_name: action.payload
            });
        case WATCHING_LOCATION:
            return currentState.merge({
                watching: true
            });
        case STOP_WATCHING_LOCATION:
            return currentState.merge({
                watching: false
            });
        default:
            return currentState;
    }
}

module.exports = app;
