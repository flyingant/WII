import React from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';

// actions
import {
    initializeApp,
    updateCurrentLocation,
    searchGroup,
    changeProfileName,
    watchingLocation,
    stopWatchingLocation
} from '../actions/RootActions';
import BusySpinner from '../components/common/BusySpinner';

import styles from '../less/main.less';

// components
import MapContainer from './MapContainer';
import Board from '../components/Board';
import MessageContainer from './MessageContainer';

class AppContainer extends React.Component {

    constructor(props) {
        super(props);
        this.toggleWatchLocationChange = this.toggleWatchLocationChange.bind(this);
        this.createOrEnterGroup = this.createOrEnterGroup.bind(this);
        this.changeProfileName = this.changeProfileName.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(initializeApp());
        const watchLocation = () => {
            _.delay(() => {
                if (this.props.app.watching) {
                    this.props.dispatch(updateCurrentLocation());
                }
                watchLocation();
            }, this.props.app.delay * 1000)
        };
        watchLocation();
    }

    toggleWatchLocationChange() {
        if (this.props.app.watching) {
            this.props.dispatch(stopWatchingLocation());
        } else {
            this.props.dispatch(updateCurrentLocation());
            this.props.dispatch(watchingLocation());
        }
    }

    createOrEnterGroup({groupTag}) {
        this.props.dispatch(searchGroup({groupTag}));
    }

    changeProfileName(name) {
        this.props.dispatch(changeProfileName(name));
    }

    render() {
        const app = this.props.app;
        return (
            <div>
                <div className={styles.container}>
                    <Board
                        profile={{
                            id: app.profile_id,
                            name: app.profile_name,
                            watching: app.watching
                        }}
                        onLocationClicked={this.toggleWatchLocationChange}
                        onEnterGroupClicked={this.createOrEnterGroup}
                        onChangeProfileName={this.changeProfileName}
                    />
                    <MessageContainer display={this.props.displayMessage} message={this.props.message}/>
                </div>
                <MapContainer/>
                <BusySpinner busy={this.props.busy}/>
            </div>
        );
    }
}

let componentState = ({root}) => ({
    busy: root.getIn(['ui', 'busy']),
    displayMessage: root.getIn(['ui', 'displayMessage']),
    message: root.getIn(['ui', 'message']),
    app: root.get('app').toJS()
});

module.exports = connect(componentState)(AppContainer);
