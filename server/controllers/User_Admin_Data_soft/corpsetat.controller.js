import httpStatus from 'http-status';
import db from '../../../config/sequelize';

//Async function
var asyncLib = require('async');

const Corpsetat= db.CorpsEtat;

/**
 * Load entreprise and append to req.
 */

function load(req, res, next, id) {
    Corpsetat.findById(id)
        .then((corpsetat) => {
            if (!corpsetat) {
                const e = new Error('Corps d\'état does not exist');
                e.status = httpStatus.NOT_FOUND;
                return next(e);
            }
            req.corpsetat = corpsetat; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {CorpsEtat}
 */
function get(req, res) {
    return res.json(req.corpsetat);
}

/**
 * Create new corps d'état
 * @property {string} req.body.corpsetat - The username of corps etat.
 * @returns {CorpsEtat}
 */

function create(req, res, next) {

    var corpsetat = req.body.corpsetat;

    asyncLib.waterfall([
        function(done) {
            Corpsetat.findOne({
                where: {DetailCorpsEtat: corpsetat}
            })
            .then(function(corpsetatFound) {
                done(null, corpsetatFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible to verify if corps d\'état exists' });
            });
        },
        function(corpsetatFound,done) {
            if(!corpsetatFound){
                Corpsetat.create({
                     DetailCorpsEtat: corpsetat
                })
                .then(function(NewCorpsEtat) {
                    done(NewCorpsEtat);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'Impossible to verify if corps d\'état exists' });
                });
            }else{
                res.status(409).json({ 'error': 'Specific corps d\'état exists' });
            }
        }
    ], function(NewCorpsEtat) {
        if (NewCorpsEtat) {
            return res.status(201).json(NewCorpsEtat);
        } else {
            return res.status(500).json({ 'error': 'Impossible to add' });
        }
    }); 
    
}

/**
 * Update existing corps etat
 * @property {string} req.body.corpsetat - The name of corpsetat.
 * @returns {CorpsEtat}
 */

function update(req, res, next) {

    const corpsetat = {
        id :req.corpsetat.id,
        name: req.body.corpsetat
    }; 

    asyncLib.waterfall([
        function(done) {
            Corpsetat.findOne({
                where: {id: corpsetat.id}
            })
            .then(function(corpsetatFound) {
                done(null, corpsetatFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible to verify if corps d\'état exists' });
            });
        },
        function(corpsetatFound,done) {
            if(corpsetatFound){
                Corpsetat.update({
                     DetailCorpsEtat: corpsetat.name
                },{
                    where :{ id: corpsetat.id}
                })
                .then(function(corpsetatUp) {
                    done(null,corpsetatUp);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'Impossible to update corps d\'état' });
                });
            }else{
                res.status(404).json({ 'error': 'Specific corps d\'état does not exist' });
            }
        },
        function(corpsetatUp,done) {
            Corpsetat.find({
                where :{ id: corpsetat.id}
            })
            .then(function(CorpsEtatUpdated) {
                done(CorpsEtatUpdated);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible to show corps d\'état' });
            });
        }
    ], function(CorpsEtatUpdated) {
        if (CorpsEtatUpdated) {
            return res.status(200).json(CorpsEtatUpdated);
        } else {
            return res.status(500).json({ 'error': 'Impossible to update' });
        }
    }); 
    
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {CorpsEtat[]}
 */

function list(req, res, next) {

    Corpsetat.findAll({
        offset: req.query.skip ? parseInt(req.query.skip) : 0, 
        limit: req.query.limit ? parseInt(req.query.limit) : 50,
    })

    .then(function(corpsetat) {
        return res.status(200).json(corpsetat);
    })
    .catch(function(err) {
         console.log(err);
        // return res.status(500).json({ 'error': 'Unable to show list' });
    });

}


/**
 * Delete entreprise.
 * @returns {CorpsEtat}
 */

function remove(req, res, next) {

    const corpsetat = req.corpsetat;
 
    corpsetat.destroy({
        where:{ id: req.corpsetat.id}
    })
    .then(() => res.json(corpsetat))
    .catch(e => next(e));
    
}


export default {list,create,get,load,update,remove};
