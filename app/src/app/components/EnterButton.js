import React, {PropTypes} from 'react';
import styles from '../less/board.less';

export default function EnterButton(props) {

    return (
        <div className={styles.boardBtn} onClick={props.onEnterClicked}>
            <div className={styles.enterIcon}></div>
        </div>
    );
}

EnterButton.propTypes = {
    onEnterClicked: PropTypes.func
};