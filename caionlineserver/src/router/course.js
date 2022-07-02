import Router from 'koa-router';
import CoursesController from "../controller/courseController";
import verify from '../middleware/verify';

const router = new Router();

router.prefix('/api/course');

router
  .get('/getAll', verify, CoursesController.getAll)
  .get('/testAdd', CoursesController.testAdd)

export default router;