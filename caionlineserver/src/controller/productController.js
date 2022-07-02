import Product from '../model/product';
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import {products as _products} from '../data/products';

class ProductsController {
    static async getAll(ctx) {
        let path = ctx.request.origin;
        let products = await Product.find({});
        ctx.body = products;
    }

    static async update(ctx) {
        let products = ctx.request.body;
        let insertings = products.filter(p => p.state === 'new');
        let deleteings = products.filter(p => p.state === 'deleted');
        let updateings = products.filter(p => p.state === 'modified');
        insertings.forEach(async element => {
            delete element.state
            let np = new Product({...element});
            await np.save()
        });
        updateings.forEach(async up => {
            let nup = {...up}
            delete nup._id
            delete nup.state
            await Product.findByIdAndUpdate(up._id, nup)
        })
        await Product.deleteMany({id: {$in: deleteings.map(d => d.id)}})
        ctx.body = {message: '完成更新'}
    }

    static async init(ctx) {
        _products.forEach(async prd => {
            console.log(prd);
            const product = new Product(prd);
            let rtn = await product.save()
        })
        let dbmsg = '产品数据初始化完成。'
        ctx.body = {
            dbmsg
        }
    }
}

export default ProductsController