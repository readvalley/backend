import Controller from '../defaults/Controller';
import checkAuth from '../middlewares/checkAuth';
import { BookModel } from '../models/Book';
import { UserModel } from '../models/User';
import getRequiredAttributes from '../utils/getRequiredAttributes';

export default class BookController extends Controller {
  public basePath = '/book';

  constructor() {
    super();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', async (req, res) => {
      const requiredAttributes = getRequiredAttributes(BookModel);
      requiredAttributes.forEach((attribute) => {
        if (!(attribute in req.body)) {
          console.log(attribute)
          return res.status(400).json({ error: 'wrong fields' });
        }
      });

      try {
        const book = new BookModel(req.body);
        await book.save();
        return res.json({ bookId: book._id });
      } catch (error) {
        return res.status(500).json({ error: error.message });
      }
    });

    this.router.post('/publish/:bookId', checkAuth, async (req, res) => {
      const bookId = req.params.bookId;
      if (!bookId) {
        return res.status(400).json({ error: 'bookId is empty' });
      }

      const book = await BookModel.findById(bookId);
      if (!book) {
        return res.status(400).json({ error: 'No such book' });
      }

      const { article } = req.body;
      if (!article) {
        return res.status(400).json({ error: 'article is empty' });
      }

      // TODO: render files
      // TODO: get path of rendered files & stream => based on document objectId
      // TODO: register to blockchain => addBook()
      // TODO: update book
      await book.update({ isPublished: true });
      return res.json({});
    });
  }
}
