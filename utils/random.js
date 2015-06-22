import uuid from 'uuid'
import _ from 'lodash'

const supportedUUIDVersions = _.filter(_.keys(uuid), (key) => {
    "use strict";
    return key.match('v');
});

export default random = {
    integer: (max, min) => {
        "use strict";
        return Math.round(random.float(max, min)) / 100;
    },
    float: (max, min) => {
        "use strict";
        return Math.random() * (max - min) + min * 100;
    },
    uuid: (version) => {
        "use strict";
        if(_.contains(supportedUUIDVersions, version)){
            return uuid[version]();
        } else {
            throw new Error(`Unsupported UUID version: ${version}`);
        }
    }
};

