import Course from '../model/course';
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import {customers} from '../data/customers';

class CoursesController {

    static async getAll(ctx) {
        let courses = await Course.find({});
        ctx.body = courses;
    }

    static async testAdd(ctx) {
        console.log('testAdd');
        let course = new Course({title: '测试课程', teacher: '老师1', description: '测试课程的说明', tags: []});
        let rtn = await course.save();
        ctx.body = rtn;
    }

    static async update(ctx) {
        let courses = ctx.request.body;
        let insertings = courses.filter(p => p.state === 'new');
        let deleteings = courses.filter(p => p.state === 'deleted');
        let updateings = courses.filter(p => p.state === 'modified');
        insertings.forEach(async element => {
            delete element.state
            let np = new Course({...element});
            await np.save()
            console.log("新增完成")
        });
        updateings.forEach(async up => {
            let nup = {...up}
            console.log("主体",nup)
            delete nup._id
            delete nup.state
            await Course.findByIdAndUpdate(up._id, nup)
            console.log("更改完成")
        })
        await Course.deleteMany({id: {$in: deleteings.map(d => d.id)}})
        ctx.body = {message: '完成更新'}
    }

}

export default CoursesController