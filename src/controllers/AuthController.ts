import Controller from '../defaults/Controller';
import { UserModel } from '../models/User';
import getRequiredAttributes from '../utils/getRequiredAttributes';
import issueToken from '../utils/issueToken';

export default class AuthController extends Controller {
  public basePath = '/auth';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/login', async (req, res) => {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.verifyPassword(password)) {
        return res.json({
          user,
          accessToken: await issueToken(user, false),
          // refreshToken: await issueToken(user, true),
        });
      }

      return res.status(401).json({ error: 'Wrong credentials' });
    });

    this.router.post('/join', async (req, res) => {
      const requiredAttributes = getRequiredAttributes(UserModel);
      requiredAttributes.forEach((attribute) => {
        if (!(attribute in req.body)) {
          console.log(attribute)
          return res.status(400).json({ error: 'wrong fields' });
        }
      });

      try {
        const user = new UserModel(req.body);
        await user.save();
        return res.json({ userId: user._id });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });
  }
}
