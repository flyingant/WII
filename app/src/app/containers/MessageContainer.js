import React from 'react';
import styles from '../less/message.less';

class MessageContainer extends React.Component {

    render() {
        let element = <div/>;
        this.props.display ? element = (
            <div className={styles.message}>
                {this.props.message}
            </div>
        ) : null;
        return element;
    }
}

module.exports = MessageContainer;
