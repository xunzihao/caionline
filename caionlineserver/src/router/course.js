import Router from 'koa-router';
import CoursesController from "../controller/courseController";
import verify from '../middleware/verify';

const router = new Router();

router.prefix('/api/course');

router
    .get('/getAll', CoursesController.getAll)
    .get('/testAdd', CoursesController.testAdd)
    .post('/update', CoursesController.update)

export default router;