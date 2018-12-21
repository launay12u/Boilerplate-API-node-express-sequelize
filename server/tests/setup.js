'use strict'

var db = require('../../config/sequelize');

db.sequelize
.sync({force:true})
.then(() => {
    console.log('Database synchronized'); // eslint-disable-line no-console
});