import Router from 'koa-router';
import CustomerController from "../controller/customerController";
import verify from '../middleware/verify';

const router = new Router();

router.prefix('/api/customer');

router
  .get('/getAll', verify, CustomerController.getAll)

export default router;