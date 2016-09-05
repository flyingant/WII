import React from 'react';
import styles from '../less/board.less';

import EnterButton from '../components/EnterButton';
import ShareButton from '../components/ShareButton';
import LocationButton from '../components/LocationButton';
import ProfilePanel from '../components/ProfilePanel';

class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tag: '',
            editing: false, // true/false
            displayProfile: false
        };
        this.onEditingTagText = this.onEditingTagText.bind(this);
        this.onEnterClicked = this.onEnterClicked.bind(this);
        this.onShareClicked = this.onShareClicked.bind(this);
        this.onLocationClicked = this.onLocationClicked.bind(this);
        this.onToggleDisplayProfilePanel = this.onToggleDisplayProfilePanel.bind(this);
        this.onProfileNameChanged = this.onProfileNameChanged.bind(this);
        this.onHandleKeyPress = this.onHandleKeyPress.bind(this);
    }

    componentDidMount() {
        
    }

    onEditingTagText(event) {
        this.setState({
            tag: event.target.value
        });
    }

    onEnterClicked() {
        if (this.state.tag.length != 0) {
            this.setState({editing: false});
            this.props.onEnterGroupClicked({groupTag: this.state.tag});
        }
    }

    onHandleKeyPress(e) {
        if (e.key === 'Enter') {
           this.onEnterClicked();
        }
    }

    onShareClicked() {
        //todo share clicked
        alert('Share button is clicked!');
    }

    onLocationClicked() {
        this.props.onLocationClicked();
    }

    onToggleDisplayProfilePanel() {
        this.setState({
            displayProfile: !this.state.displayProfile
        });
    }

    onProfileNameChanged(event) {
        this.props.onChangeProfileName(event.target.value);
    }

    render() {
        let inputContainerStyle = this.state.editing ? styles.editing : styles.non_editing;
        let inputText = this.state.editing ? this.state.tag : (this.state.tag ? '#' + this.state.tag : '');
        return (
            <div className={styles.board}>
                <div className={styles.profileBtn} onClick={this.onToggleDisplayProfilePanel}>
                    <div className={styles.profileIcon}></div>
                </div>
                <div className={styles.profileName}>{this.props.profile.name}</div>
                <div className={inputContainerStyle}>
                    <span className={styles.hashTag}>#</span>
                    <input
                        className={styles.groupTagInput}
                        type="text"
                        onFocus={() => this.setState({editing: true})}
                        value={inputText}
                        placeholder={"Seach hashtag"}
                        onChange={this.onEditingTagText}
                        onKeyPress={this.onHandleKeyPress}
                    />
                    {
                        this.state.editing ? <EnterButton onEnterClicked={this.onEnterClicked}/> :
                            <LocationButton watching={this.props.profile.watching} onLocationClicked={this.onLocationClicked}/> 
                            /*<ShareButton onShareClicked={this.onShareClicked}/> */
                    }
                </div>
                {
                    this.state.displayProfile ?
                        <ProfilePanel
                            profile={this.props.profile}
                            onHideProfilePanel={this.onToggleDisplayProfilePanel}
                            onProfileNameChanged={this.onProfileNameChanged}
                        />
                        : null
                }
            </div>
        );
    }
}

module.exports = Board;
