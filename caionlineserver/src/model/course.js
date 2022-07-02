import mongoose from '../dbHelper';
import {defaultSchemaExtend, defaultSchemaOptions} from "../config/index";

const Schema = mongoose.Schema;

const CourseSchema = new Schema(Object.assign({
    title: String,
    teacher: String,
    description: String,
    tags: {
        type: Array
    }
}, defaultSchemaExtend), defaultSchemaOptions);

const Course = mongoose.model('Course', CourseSchema, 'Courses');

export default Course