import Controller from '../defaults/Controller';

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
  }
}
