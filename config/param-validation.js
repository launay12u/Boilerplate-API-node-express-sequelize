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

    // POST /api/corpsetats
    createCorpsEtat: {
        body: {
            corpsetat: Joi.string().required(),
        },
    },

    // UPDATE /api/teams/:teamId
    updateCorpsEtat: {
        body: {
            corpsetat: Joi.string().required(),
        },
        params: {
            corpsetatId: Joi.string().hex().required(),
        },
    },

    
    // POST /api/auth/login
    login: {
        body: {
            username: Joi.string().required(),
            password: Joi.string().required(),
        },
    },
    
    // POST /api/userTeam
    createUserTeam: {
        body: {
            iduser: Joi.string().required(),
            idteam: Joi.string().required(),
        },
    },

    // PUt /api/userTeam/:userId
    updateUserTeam: {
        body: {
            teamId: Joi.string().required(),
        },
        params: {
            userId: Joi.string().hex().required(),
        },
    },
};
