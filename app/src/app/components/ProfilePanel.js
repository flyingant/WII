import React from 'react';
import ReactDOM from 'react-dom'
import styles from '../less/profile.less';

class ProfilePanel extends React.Component {

    conmponentDidMount() {
        ReactDOM.findDOMNode(this.refs.nameInput).focus(); 
    }

    render() {
        return (
            <div className={styles.profilePanel}>
                <div className={styles.closeBtn} onClick={this.props.onHideProfilePanel}></div>
                <div className={styles.avatar}></div>
                <input className={styles.nameInput} ref="nameInput" maxLength="10" type="text" value={this.props.profile.name} placeholder="Your Name"
                       onChange={this.props.onProfileNameChanged}/>
            </div>
        );
    }
}

module.exports = ProfilePanel;
