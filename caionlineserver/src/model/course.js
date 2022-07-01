import mongoose from '../dbHelper';
import {defaultSchemaExtend, defaultSchemaOptions} from "../config/index";

const schema = mongoose.Schema;
const CourseSchema = new schema(Object.assign({
    title: String,
    teacher: String,
    description: String,
    tags: {
        type: Array
    }
}, defaultSchemaExtend), defaultSchemaOptions);
const Course = mongoose.model('Course', CourseSchema, 'Course');
export default Course;