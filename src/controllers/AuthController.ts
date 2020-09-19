import Controller from '../defaults/Controller';
import { UserModel } from '../models/User';

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

    this.router.post('/join', (req, res) => {
    });
  }
}
