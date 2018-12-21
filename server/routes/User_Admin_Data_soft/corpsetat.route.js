import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../../config/param-validation';
import corpsetatCtrl from '../../controllers/User_Admin_Data_soft/corpsetat.controller';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')

    /** GET /api/corpsetats - Get list of corpsetats */
    .get(corpsetatCtrl.list)

    /** POST /api/corpsetats - Create new corps etat */
    .post(validate(paramValidation.createCorpsEtat), corpsetatCtrl.create);

router.route('/:corpsetatId')

    /** GET /api/corpsetats/:corpsetatId - Get corps d'état */
    .get(corpsetatCtrl.get)

    /** PUT /api/corpsetats/:corpsetatId - Update user */
    .put(validate(paramValidation.updateCorpsEtat), corpsetatCtrl.update)

    /** DELETE /api/corpsetats/:corpsetatId - Delete user */
    .delete(corpsetatCtrl.remove);

/** Load corps d'état when API with corpsetatId route parameter is hit */
router.param('corpsetatId', corpsetatCtrl.load);

export default router;
