import { Router } from 'express';

const router = Router();

router.get('/hi', (req, res) => {
  res.send('HI');
});

export default router;
