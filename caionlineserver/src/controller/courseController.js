import Course from '../model/course';
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import {customers} from "../data/customers";
class CoursesController{
    static async getAll(ctx){
        let courses= await Course.find({});
        ctx.body = courses;
    }
    static async testAdd(ctx){
        course = new Course({title: "测试课程1", teacher: "老师1", description: "说明1", tags: []});
        let rtn=await course.save();
        ctx.body=rtn;
    }


}
export default CoursesController;