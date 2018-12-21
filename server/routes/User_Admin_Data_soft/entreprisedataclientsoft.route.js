import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../../config/param-validation';
import entrepriseCtrl from '../../controllers/User_Admin_Data_soft/entreprisedataclientsoft.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/entreprises - Get list of entreprises */
    .get(entrepriseCtrl.list)

    /** POST /api/entreprises - Create new entreprise */
    .post(validate(paramValidation.createEntreprise), entrepriseCtrl.create);

router.route('/:entrepriseId')

    /** GET /api/entreprises/:entrepriseId - Get entreprise */
    .get(entrepriseCtrl.get)

    /** PUT /api/entreprises/:entrepriseId - Update entreprise */
    .put(validate(paramValidation.updateEntreprise), entrepriseCtrl.update)

    /** DELETE /api/entreprises/:entrepriseId - Delete entreprise */
    .delete(entrepriseCtrl.remove);

/** Load entreprise when API with userId route parameter is hit */
router.param('entrepriseId', entrepriseCtrl.load);

export default router;
