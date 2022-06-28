import mongoose from '../dbHelper';
import { defaultSchemaExtend, defaultSchemaOptions } from "../config/index";

const Schema = mongoose.Schema;

const SignSchema = new Schema(Object.assign({
  firstName: String, lastName: String,
  email: String,
  password: String
}, defaultSchemaExtend), defaultSchemaOptions);

const Sign = mongoose.model('Sign', SignSchema, 'Signs');

export default Sign