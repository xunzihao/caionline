import * as jwt from "jsonwebtoken";
import {jwtConfig} from "../config/index";

export default async (ctx, next) => {
    const token = ctx.get('Authorization');
    if (token === '') {
        ctx.throw(401, 'no token detected in http header \'token\'');
    }
    try {
        await jwt.verify(token, jwtConfig.secret);
    } catch (err) {
        ctx.throw(401, 'invalid token');
    }

    await next();
}