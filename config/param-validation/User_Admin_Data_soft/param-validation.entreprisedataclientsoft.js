import Joi from 'joi';

export default {
    
    // POST /api/entreprises
    createEntreprise: {
        body: {
            name: Joi.string().required(),
            rs:Joi.string().required(),
            siret:Joi.string().required(),
            mail:Joi.string().required(),
            tel:Joi.string().required(),
            libelle:Joi.string().required(),
            ville:Joi.string().required(),
            cp:Joi.number().integer().required(),
            lat:Joi.number().integer().required(),
            long:Joi.number().integer().required(),
            CorpsEtatId:Joi.string().required()
        },
    },

    // UPDATE /api/entreprises/:entrepriseId
    updateEntreprise: {
        body: {
            name: Joi.string().required(),
            rs:Joi.string().required(),
            siret:Joi.string().required(),
            mail:Joi.string().required(),
            tel:Joi.string().required(),
            libelle:Joi.string().required(),
            ville:Joi.string().required(),
            cp:Joi.number().integer().required(),
            lat:Joi.number().integer().required(),
            long:Joi.number().integer().required(),
            CorpsEtatId:Joi.string().required()
        },
        params: {
            entrepriseId: Joi.string().hex().required(),
        },
    },

};
