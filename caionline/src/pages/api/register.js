import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/session';
import * as serviceKit from '../../services/';

export default withIronSessionApiRoute(registerRoute, ironOptions);

async function registerRoute(req, res) {
  const { email, password, firstName, lastName } = await req.body;
  console.log(email, password, firstName, lastName);
  try {
    let rtn = await serviceKit.signServices.register({ email, password, firstName, lastName });
    console.log('serviceKit.signServices.register', rtn);
    const user = {
      isLoggedIn: false,
      login: `${firstName} ${lastName}`,
      email: email,
      avatarUrl: '/static/images/avatars/avatar_7.png'
    };
    //req.session.user = user
    //await req.session.save()
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
}
