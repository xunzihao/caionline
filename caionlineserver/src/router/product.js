import Router from 'koa-router';
import ProductsController from "../controller/productController";
import verify from '../middleware/verify';

const router = new Router();

router.prefix('/api/product');

router
    .get('/getAll', ProductsController.getAll)
    .post('/update', ProductsController.update)
    .get('/init', ProductsController.init)

export default router;