import Controller from '../defaults/Controller';
import { UserModel } from '../models/User';
import getRequiredAttributes from '../utils/getRequiredAttributes';

export default class AuthController extends Controller {
  public basePath = '/auth';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/login', async (req, res) => {
      const { email, password } = req.body;

      const user = await UserModel.findOne({ email, password });
      console.log(user);
      return res.json({ user });
    });

    this.router.post('/join', async (req, res) => {
      const requiredAttributes = getRequiredAttributes(UserModel);
      requiredAttributes.forEach((attribute) => {
        if (!(attribute in req.body)) {
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
