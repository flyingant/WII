import {
    BUSY,
    BUSY_COMPLETED,
    SHOW_MESSAGE,
    HIDE_MESSAGE,
} from './CommonActionTypes';

export function busy() {
    return {
        type: BUSY
    };
}

export function busyCompleted() {
    return {
        type: BUSY_COMPLETED
    };
}

export function showMessage(payload) {
    return {
        type: SHOW_MESSAGE,
        payload: payload
    };
}

export function hideMessage() {
    return {
        type: HIDE_MESSAGE
    };
}