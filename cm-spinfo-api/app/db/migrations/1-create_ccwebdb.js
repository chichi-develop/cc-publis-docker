'use strict';

var Sequelize = require('sequelize');

/**
 * Actions summary:
 *
 * createTable "cm_aclg", deps: []
 * createTable "cm_mdmm", deps: []
 *
 **/

var info = {
    "revision": 1,
    "name": "create_ccwebdb",
    "created": "2019-04-17T07:50:17.259Z",
    "comment": ""
};

var migrationCommands = [{
        fn: "createTable",
        params: [
            "cm_aclg",
            {

            },
            {}
        ]
    },
    {
        fn: "createTable",
        params: [
            "cm_mdmm",
            {

            },
            {}
        ]
    }
];

module.exports = {
    pos: 0,
    up: function(queryInterface, Sequelize)
    {
        var index = this.pos;
        return new Promise(function(resolve, reject) {
            function next() {
                if (index < migrationCommands.length)
                {
                    let command = migrationCommands[index];
                    console.log("[#"+index+"] execute: " + command.fn);
                    index++;
                    queryInterface[command.fn].apply(queryInterface, command.params).then(next, reject);
                }
                else
                    resolve();
            }
            next();
        });
    },
    info: info
};
