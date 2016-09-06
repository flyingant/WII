import utils from './utils';

module.exports = {

    horizon: null,

    status: () => {
        window.horizon.status()
    },

    init: (successCallback, errorCallback) => {
        window.horizon = Horizon();
        window.horizon.onReady(() => {
            successCallback();
        });
        window.horizon.onSocketError(() => {
            errorCallback();
        });
        window.horizon.connect();
    },

    searchGroup: (groupTag) => {
        const groups = horizon("groups");
        return new Promise((resolve) => {
            groups.find({
                tag: '#' + groupTag
            }).fetch().defaultIfEmpty().subscribe((group) => {
                if (group == null) {
                    resolve(null)
                } else {
                    resolve({
                        id: group.id,
                        tag: groupTag
                    })
                }
            });
        });
    },

    createGroup: (groupTag) => {
        const groups = horizon("groups");
        return new Promise((resolve) => {
            groups.store({
                id: utils.uuid(),
                tag: '#' + groupTag
            }).subscribe((group) => {
                resolve({
                    id: group.id,
                    tag: groupTag
                })
            }, () => {
                resolve(null)
            })
        });
    },

    watchGroup: (group) => {
        let infoWindow = new AMap.InfoWindow({offset: new AMap.Pixel(0, -30)});
        let markerClick = (e) => {
            infoWindow.setContent(e.target.content);
            infoWindow.open(window.map, e.target.getPosition());
        };
        const locations = horizon("locations");
        locations.findAll({groupId: group.id, groupTag: group.tag}).watch().subscribe((profiles) => {
            window.map.clearMap();
            let members = [];
            profiles.forEach((profile) => {
                if (profile.last_updated && (new Date().getTime() - new Date(profile.last_updated).getTime()) / 1000 < 600) {
                    let marker = new AMap.Marker({
                        icon: 'http://flyingant.oss-cn-hangzhou.aliyuncs.com/1472028532_10_who_human_you_confuse_man_male_behaviour.png-f69ce99e-0fd4-4a2f-9320-936ee0db3088.png',
                        position: [profile.lng, profile.lat],
                        draggable: true,
                        cursor: 'move'
                    });
                    marker.content = profile.name;
                    marker.on('click', markerClick);
                    members.push(
                        {
                            id: profile.id,
                            name: profile.name,
                            marker: marker
                        }
                    )
                }
            });

            members.forEach((member) => {
                member.marker.setTitle(member.name);
                member.marker.setLabel({
                    offset: new AMap.Pixel(0, -20),//修改label相对于maker的位置
                    content: member.name
                });
                member.marker.setMap(window.map);
            });

            // window.map.setFitView()

        });
    },

    updateProfile: (data) => {
        const locations = horizon("locations");
        locations.store({
            groupId: data.group_id,
            groupTag: data.group_tag,
            id: data.profile_id,
            name: data.profile_name,
            lat: data.profile_lat,
            lng: data.profile_lng,
            last_updated: new Date()
        });
    },

    disconnect: () => {
        window.horizon.onDisconnected(() => {
            alert('DB Disconnected!');
        });
        window.horizon.disconnect();
    }

};