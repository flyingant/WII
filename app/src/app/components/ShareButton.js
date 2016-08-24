import React, {PropTypes} from 'react';
import styles from '../less/board.less';

export default function ShareButton(props) {
    return (
        <div className={styles.boardBtn} onClick={props.onShareClicked}>
            <div className={styles.shareIcon}></div>
        </div>
    );
}

ShareButton.propTypes = {
    onShareClicked: PropTypes.func
};