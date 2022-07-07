import Classes from '../model/Classes';
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import {customers} from '../data/customers';

class ClassesController {

    static async getAll(ctx) {
        let classes = await Classes.find({});
        ctx.body = classes
    }

    static async testAdd(ctx) {
        console.log('testAdd');
        let classes = new Classes({title: '测试课程', teacher: '老师1', description: '测试课程的说明', tags: []});
        let rtn = await classes.save();
        ctx.body = rtn;
    }

    static async update(ctx) {
        let classes = ctx.request.body;
        let insertings = classes.filter(p => p.state === 'new');
        let deleteings = classes.filter(p => p.state === 'deleted');
        let updateings = classes.filter(p => p.state === 'modified');
        insertings.forEach(async element => {
            delete element.state
            let np = new Classes({...element});
            await np.save()
            console.log("新增完成")
        });
        updateings.forEach(async up => {
            let nup = {...up}
            console.log("主体",nup)
            delete nup._id
            delete nup.state
            await Classes.findByIdAndUpdate(up._id, nup)
            console.log("更改完成")
        })
        await Classes.deleteMany({id: {$in: deleteings.map(d => d.id)}})
        ctx.body = {message: '完成更新'}
    }

}

export default ClassesController