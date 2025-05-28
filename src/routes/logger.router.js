import { Router } from 'express';
import logger from '../utils/logger.js';

const router = Router();

router.get('/loggerTest', (req, res) => {
  req.logger.debug("Este es un log de tipo DEBUG");
  req.logger.http("Este es un log de tipo HTTP");
  req.logger.info("Este es un log de tipo INFO");
  req.logger.warning("Este es un log de tipo WARNING");
  req.logger.error("Este es un log de tipo ERROR");
  req.logger.fatal("Este es un log de tipo FATAL");

  logger.fatal('Este es un error fatal forzado para prueba');
  res.send("Logs generados correctamente");
});

export default router;
