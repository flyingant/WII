import Immutable from 'immutable';

import {BUSY, BUSY_COMPLETED, SHOW_MESSAGE, HIDE_MESSAGE} from '../actions/CommonActionTypes';

const DEFAULT_UI_STATE = {
    busy: false
};

function ui(state, action) {
    const currentState = state || Immutable.Map(DEFAULT_UI_STATE);
    switch (action.type) {
        case BUSY:
            return state.merge({'busy': true});
        case BUSY_COMPLETED:
            return state.merge({'busy': false});
        case SHOW_MESSAGE:
            return state.merge({
                displayMessage: true,
                message: action.payload.message
            });
        case HIDE_MESSAGE:
            return state.merge({
                displayMessage: false,
                message: ''
            });
        default:
            return currentState;
    }
}

module.exports = ui;
