import Router from 'koa-router';
import SignController from "../controller/SignController";
import verify from '../middleware/verify';

const router = new Router();

router.prefix('/api/sign');

router
  .get('/login', SignController.login)
  //.post('/register', verify, SignController.register)
  .post('/register', SignController.register)
  .get('/test', verify, SignController.test)

export default router;