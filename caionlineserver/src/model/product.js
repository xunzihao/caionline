import mongoose from '../dbHelper';
import {defaultSchemaExtend, defaultSchemaOptions} from "../config/index";

const Schema = mongoose.Schema;

const ProductSchema = new Schema(Object.assign({
    id: String,
    code: String,
    name: String,
    description: String,
    image: String,
    price: Number,
    category: String,
    quantity: Number,
    rating: Number,
    inventoryStatus: String
}, defaultSchemaExtend), defaultSchemaOptions);

const Product = mongoose.model('Product', ProductSchema, 'Products');

export default Product