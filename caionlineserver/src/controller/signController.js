import Sign from "../model/sign";
import ApiError from "../error/ApiError";
import ApiErrorNames from "../error/ApiErrorNames";
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../config/index";
import verify from '../middleware/verify';
import { emit } from "nodemon";

class SignController {

  static async login(ctx) {
    let signToken = {
      email: ctx.query.email,
      password: ctx.query.password
    }
    let sign = await Sign.findOne(signToken)
    console.log('sign',sign)
    if (sign) {
      //token签名 有效期为3小时
      const token = jwt.sign(signToken, jwtConfig.secret, { expiresIn: '3h' })
      ctx.body = {
        token,sign
      }
    } else {
      throw new ApiError(ApiErrorNames.UserNotExist);
    }
  }
  static async register(ctx) {
    console.log(ctx.request.body)
    let { email, password, firstName, lastName } = ctx.request.body;
    const sign = new Sign({ email, password, firstName, lastName });
    let rtn = await sign.save()
    let dbmsg = '注册成功'
    ctx.body = {
      dbmsg
    }
    console.log('rtn', rtn)
  }
  static async test(ctx) {
    ctx.body = 'token available'
  }
}

export default SignController