import React from 'react';
import styles from '../less/profile.less';

class ProfilePanel extends React.Component {

    render() {
        return (
            <div className={styles.profilePanel}>
                <div className={styles.closeBtn} onClick={this.props.onHideProfilePanel}></div>
                <div className={styles.avatar}></div>
                <input className={styles.nameInput} type="text" value={this.props.profile.name} placeholder="Your Name"
                       onChange={this.props.onProfileNameChanged}/>
            </div>
        );
    }
}

module.exports = ProfilePanel;
