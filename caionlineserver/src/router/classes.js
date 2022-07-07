import Router from 'koa-router';
import ClassesController from "../controller/ClassesController";
import verify from '../middleware/verify';

const router = new Router();

router.prefix('/api/classes');

router
    .get('/getAll', ClassesController.getAll)
    .get('/testAdd', ClassesController.testAdd)
    .post('/update', ClassesController.update)

export default router;