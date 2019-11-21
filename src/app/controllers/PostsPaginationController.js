import * as Yup from 'yup';
import Post from '../models/Post';

class PostsPaginationController {
  async show(req, res) {
    const paginate = ({ page, size }) => {
      page = parseInt(page, 0) - 1; // make the first page as 0
      size = parseInt(size, 0);
      const offset = page * size;
      const limit = offset + size;
      return {
        offset,
        limit,
      };
    };

    const { page, size } = req.params;

    const categories = await Post.findAll({
      ...paginate({ page, size }),
      attributes: [
        'id',
        'title',
        'content',
        'author',
        'created_at',
        'updated_at',
      ],
      order: [['id', 'DESC']],
    });

    return res.json(categories);
  }
}

export default new PostsPaginationController();
