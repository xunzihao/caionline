import { withIronSessionApiRoute } from 'iron-session/next';
import { ironOptions } from '../../lib/session';
import serviceKit from '../../services/serviceKit';

export default withIronSessionApiRoute(eventsRoute, ironOptions);

async function eventsRoute(req, res) {
  const user = req.session.user;

  if (!user || user.isLoggedIn === false) {
    res.status(401).end();
    return;
  }

  try {
    // const { data: events } =
    //   await serviceKit.TestService({
    //     username: user.login,
    //   })

    res.json('events');
  } catch (error) {
    res.status(200).json([]);
  }
}
