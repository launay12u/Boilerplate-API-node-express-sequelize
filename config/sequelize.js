import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import config from './config';

const db = {};

// connect to mysql 
const sequelizeOptions = {
    dialect: 'mysql',
    port: config.mysql.port,
    host: config.mysql.host,
    operatorsAliases: false,
    pool: {
        max: 5,
        min: 0,
        idle: 10000,
    },
};

const sequelize = new Sequelize(
    config.mysql.db,
    config.mysql.user,
    config.mysql.password,
    sequelizeOptions
);

const modelsDir = path.normalize(`${__dirname}/../server/models`);

// loop through all files in models directory ignoring hidden files and this file
fs.readdirSync(modelsDir)
    .filter(file => (file.indexOf('.') !== 0) && (file.indexOf('.map') === -1))
    // import model files and save model names
    .forEach((file) => {
        console.log(`Loading model file ${file}`); // eslint-disable-line no-console
        const model = sequelize.import(path.join(modelsDir, file));
        db[model.name] = model;
    });
    
Object
    .keys(db)
    .forEach(function(modelName) {
        if ("associate" in db[modelName]) {
        db[modelName].associate(db);
        }
    });
    
// Synchronizing any model changes with database.

// if test, use test database
const isTestEnvironment = config.env === 'test';

//On synchronise uniquement sur la database test // Modif à apporter pour deploiement

if(isTestEnvironment){
    sequelize
        .sync()
        .then(() => {
            console.log('Database synchronized'); // eslint-disable-line no-console
        })
        .catch((error) => {
            if (error) console.log('An error occured %j', error); // eslint-disable-line no-console
        });
}
// assign the sequelize variables to the db object and returning the db.
module.exports = _.extend({
    sequelize,
    Sequelize,
}, db);
