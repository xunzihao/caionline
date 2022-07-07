import mongoose from '../dbHelper';
import {defaultSchemaExtend, defaultSchemaOptions} from "../config/index";

const Schema = mongoose.Schema;

const CourseSchema = new Schema(Object.assign({
    id:String,
    Status:String,
    name: String,
    teacher: String,
    description: String,
    tags: {
        type: Array
    }
}, defaultSchemaExtend), defaultSchemaOptions);

const Classes = mongoose.model('Class', CourseSchema, 'Classes');

export default Classes