import Course from '../model/course';
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import { customers } from '../data/customers';
class CoursesController {

  static async getAll(ctx) {
    let courses = await Course.find({}) ;
    ctx.body = courses;
  }
  static async testAdd(ctx) {    
    console.log('testAdd');
    let course=new Course({title:'测试课程',teacher:'老师1',description:'测试课程的说明',tags:[]});
    let rtn = await course.save();
    ctx.body = rtn;
  }

}

export default CoursesController