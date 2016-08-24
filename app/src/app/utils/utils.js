import _ from 'lodash';

module.exports = {

    isEmail: function (email) {
        var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        return reg.test(email);
    },

    delayForSeconds: (seconds) => {
        return new Promise((resolve) => {
            _.delay(() => {
                resolve();
            }, seconds * 1000);
        })
    },

    uuid: () => {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    }

};