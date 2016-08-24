import React, {PropTypes} from 'react';
import styles from '../less/board.less';

export default function LocationButton(props) {
    let iconStyle = props.watching ? styles.locationAnimatedIcon : styles.locationIcon
    return (
        <div className={styles.locationBtn} onClick={props.onLocationClicked}>
            <div className={iconStyle}></div>
        </div>
    );
}

LocationButton.propTypes = {
    onLocationClicked: PropTypes.func
};