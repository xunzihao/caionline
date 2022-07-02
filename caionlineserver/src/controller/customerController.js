import User from "../model/user";
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import {customers} from '../data/customers'

class CustomersController {

    static async getAll(ctx) {
        console.log('get', customers)
        ctx.body = customers;
        console.log(customers)
    }

}

export default CustomersController