import Router from "koa-router";
import CourseController from "../controller/courseController";
import verify from "../middleware/verify";

const router = new Router();
router.prefix("/api/course");
router
    .get("/getAll", CourseController.getAll)
    .get("/testAdd", CourseController.testAdd)
 export default router;