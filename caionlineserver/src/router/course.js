import Router from "koa-router";
import CourseController from "../controllers/course";
import verify from "../middleware/verify";

const router = new Router();
router.prefix("/api/course");
router
    .get("/getAll", verify, CourseController.getAll)
    .get("/testAdd", verify, CourseController.testAdd)
