import express from 'express';
import authRoutes from './auth.route';
import entrepriseRoutes from './User_Admin_Data_soft/entreprisedataclientsoft.route';
import corpsetatRoutes from './User_Admin_Data_soft/corpsetat.route';

// import userteamRoutes from './userteam.route';

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);

// mount Entreprise routes at /Entreprise
router.use('/entreprises', entrepriseRoutes);

// mount Corps Etat routes at /CorpsEtat
router.use('/corpsetats', corpsetatRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

export default router;
