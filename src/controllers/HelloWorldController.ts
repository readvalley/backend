import Controller from '../defaults/Controller';
import checkAuth from '../middlewares/checkAuth';

export default class HelloWorldController extends Controller {
  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', (_, res) => {
      return res.json({
        whoami: 'Backend service for Readvalley',
      });
    });

    this.router.get('/private', checkAuth, (req, res) => {
      const identity = req.app.get('user');
      console.log(identity);
      return res.json({
        wow: 'you found the secret route!',
      });
    })
  }
}
