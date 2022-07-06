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

const Course = mongoose.model('Course', CourseSchema, 'Courses');

export default Course