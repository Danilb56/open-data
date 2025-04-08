import { geoController } from '#core/controllers/geo.js';
import express from 'express';

const router = express.Router();

router.get('/markers', (req, res) => geoController.getMarkers(req, res));

export default router;
