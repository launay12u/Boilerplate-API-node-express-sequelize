import httpStatus from 'http-status';
import db from '../../../config/sequelize';

//Async function
var asyncLib = require('async');

const Entreprise = db.EntrepriseDataClientSoft;
const Corpsetat= db.CorpsEtat;
/**
 * Load entreprise and append to req.
 */

function load(req, res, next, id) {
    Entreprise.findById(id)
        .then((entreprise) => {
            if (!entreprise) {
                const e = new Error('Entreprise does not exist');
                e.status = httpStatus.NOT_FOUND;
                return next(e);
            }
            req.entreprise = entreprise; // eslint-disable-line no-param-reassign
            return next();
        })
        .catch(e => next(e));
}

/**
 * Get user
 * @returns {Entreprise}
 */
function get(req, res) {
    return res.json(req.entreprise);
}

/**
 * Create new entreprise
 * @property {string} req.body.name - The username of entreprise.
 * @property {string} req.body.rs - The mobileNumber of entreprise.
 * @property {string} req.body.siret
 * @property {string} req.body.mail
 * @property {string} req.body.tel
 * @property {string} req.body.url
 * @property {string} req.body.num
 * @property {string} req.body.cplt
 * @property {string} req.body.libelle
 * @property {string} req.body.ville
 * @property {integer} req.body.cp
 * @property {integer} req.body.lat
 * @property {integer} req.body.long
 * @property {integer} req.body.CorpsEtatId
 * @returns {Entreprise}
 */
function create(req, res, next) {

    const entreprise = {
        NomEnt: req.body.name,
        RaisonSocialeEnt:req.body.rs,
        SiretEnt:req.body.siret,
        MailContactEnt:req.body.mail,
        TelEnt:req.body.tel,
        UrlLogoEnt:req.body.url,
        NumClient:req.body.num,
        CompltAddrsEnt:req.body.cplt,
        NumLibEnt:req.body.libelle,
        VilleEnt:req.body.ville,
        CpEnt:req.body.cp,
        LatAddrsEnt:req.body.lat,
        LongAddrsEnt:req.body.long,
        CorpsEtat_CorpsEtatID:req.body.CorpsEtatId
    };

    asyncLib.waterfall([
        function(done) {
            Corpsetat.findOne({
                where: {id: entreprise.CorpsEtat_CorpsEtatID}
            })
            .then(function(corpsetatFound) {
                done(null, corpsetatFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible to verify if corps d\'état exists' });
            });
        },
        function(corpsetatFound, done) {
            if(corpsetatFound) {
                Entreprise.findOne({
                    where: {SiretEnt: entreprise.SiretEnt}
                })
                .then(function(EntrepriseFound) {
                    done(null,EntrepriseFound);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'Impossible to verify if entreprise exists' });
                });
            } else {
                res.status(404).json({ 'error': 'Specific corps d\'état does not exist' });
            }
        },
        function(EntrepriseFound,done) {
            if(!EntrepriseFound) {
                Entreprise.create(entreprise)
                .then(function(NewEntreprise) {
                    done(NewEntreprise);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'Impossible to add a entreprise' });
                });
            } else {
                res.status(404).json({ 'error': 'Siret already exists' });
            }
        }
    ], function(NewEntreprise) {
        if (NewEntreprise) {
            return res.status(201).json(NewEntreprise);
        } else {
            return res.status(500).json({ 'error': 'Impossible to add' });
        }
    }); 


}

/**
 * Update existing entreprise
 * @property {string} req.body.name - The username of entreprise.
 * @property {string} req.body.mobileNumber - The mobileNumber of entreprise.
 * @returns {Entreprise}
 */
function update(req, res, next) {

    var entreprisedataclientsoft=req.entreprise;

    asyncLib.waterfall([
        function(done) {
            Corpsetat.findOne({
                where: {id: entreprisedataclientsoft.CorpsEtat_CorpsEtatID}
            })
            .then(function(corpsetatFound) {
                done(null, corpsetatFound);
            })
            .catch(function(err) {
                return res.status(500).json({ 'error': 'Impossible de verifier si le corps d\'état existe' });
            });
        },
        function(corpsetatFound,done) {
            if(corpsetatFound) {
                Entreprise.update({
                    NomEnt: req.body.name,
                    RaisonSocialeEnt:req.body.rs,
                    SiretEnt:req.body.siret,
                    MailContactEnt:req.body.mail,
                    TelEnt:req.body.tel,
                    UrlLogoEnt:req.body.url,
                    NumClient:req.body.num,
                    CompltAddrsEnt:req.body.cplt,
                    NumLibEnt:req.body.libelle,
                    VilleEnt:req.body.ville,
                    CpEnt:req.body.cp,
                    LatAddrsEnt:req.body.lat,
                    LongAddrsEnt:req.body.long,
                    CorpsEtat_CorpsEtatID:req.body.CorpsEtatId
                },{
                    where:{id:entreprisedataclientsoft.id}
                })
                .then(function(EntrepriseUpdated) {
                    done(null,EntrepriseUpdated);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'impossible d\'ajouter une entreprise' });
                });
            } else {
                res.status(404).json({ 'error': 'Une entreprise ayant le même numéro de siret existe déjà' });
            }
        },
        function(EntrepriseUpdated,done) {
            if(EntrepriseUpdated) {
                Entreprise.find({
                    where:{id:entreprisedataclientsoft.id}
                })
                .then(function(ShowEntrepriseUpdated) {
                    done(ShowEntrepriseUpdated);
                })
                .catch(function(err) {
                    return res.status(500).json({ 'error': 'impossible d\'ajouter une entreprise' });
                });
            } else {
                res.status(404).json({ 'error': 'Une entreprise ayant le même numéro de siret existe déjà' });
            }
        }
    ], function(ShowEntrepriseUpdated) {
        if (ShowEntrepriseUpdated) {
            return res.status(200).json(ShowEntrepriseUpdated);
        } else {
            return res.status(500).json({ 'error': 'Ajout impossible' });
        }
    }); 

}

/**
 * Get entreprise list.
 * @property {number} req.query.skip - Number of entreprises to be skipped.
 * @property {number} req.query.limit - Limit number of entreprises to be returned.
 * @returns {Entreprise[]}
 */

function list(req, res, next) {
    Entreprise.findAll({
        offset: req.query.skip ? parseInt(req.query.skip) : 0, 
        limit: req.query.limit ? parseInt(req.query.limit) : 50
    })

    .then(function(entreprise) {
        return res.status(200).json(entreprise);
    })
    .catch(function(err) {
         console.log(err);
        // return res.status(500).json({ 'error': 'Unable to show list' });
    });
}

/**
 * Delete entreprise.
 * @returns {Entreprise}
 */

function remove(req, res, next) {

    const entreprise = req.entreprise;
 
    entreprise.destroy({
        where:{ id: req.entreprise.id}
    })
    .then(() => res.json(entreprise))
    .catch(e => next(e));
    
}


export default { load, get, create, update, list, remove };
