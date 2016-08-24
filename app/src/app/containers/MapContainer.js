import React from 'react';
import styles from '../less/map.less';
import map from '../utils/map';

class MapContainer extends React.Component {

    componentDidMount() {
        map.init(this.refs.map);
    }

    render() {
        return (
            <div ref="map" className={styles.map}></div>
        );
    }
}

module.exports = MapContainer;
