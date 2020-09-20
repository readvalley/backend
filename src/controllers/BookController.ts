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
    this.router.post('/register', checkAuth, async (req, res) => {
      const requiredAttributes = getRequiredAttributes(BookModel);
      requiredAttributes.forEach((attribute) => {
        if (!(attribute in req.body)) {
          console.log(attribute)
          return res.status(400).json({ error: 'wrong fields' });
        }
      });

      const identity = req.app.get('user');
      try {
        const book = new BookModel({
          ...req.body,
          series: null,
          creator: identity._id,
        });
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

      const identity = req.app.get('user');
      console.log(identity);
      const { article } = req.body;
      if (!article) {
        return res.status(400).json({ error: 'article is empty' });
      }

      // render files
      // get path of rendered files & stream => based on document objectId
      // register to blockchain => addBook()
      // update book
      await book.update({ isPublished: true });
      return res.json({});
    });

    this.router.get('/', checkAuth, async (_, res) => {
      const books = await BookModel.find({});
      return res.json({ books });
    });

    this.router.get('/:bookId', checkAuth, async (req, res) => {
      const bookId = req.params.bookId;
      const book = await BookModel.findById(bookId);
      if (!book) {
        return res.status(400).json({ error: 'No such book' });
      }

      const { pages = 0 } = book;
      const streams = [...Array(pages)].map((_, index) =>
        `/streams/${book._id}-${index}/stream.mpd`);
      return res.json({
        book,
        streams,
      });
    });
  }
}
