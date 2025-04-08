import { prisma } from '#core/db.js';

class GeoController {
  async getMarkers(req, res) {
    const markers = await prisma.location.findMany();
    res.status(200).json({ markers });
  }
}

export const geoController = new GeoController();
