import { withIronSessionApiRoute } from 'iron-session/next'
import { ironOptions } from '../../lib/session'
export default withIronSessionApiRoute(logoutRoute, ironOptions)

function logoutRoute(req, res) {
  req.session.destroy()
  res.json({ isLoggedIn: false, login: '', avatarUrl: '' })
}
