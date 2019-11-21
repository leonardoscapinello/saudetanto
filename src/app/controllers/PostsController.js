import * as Yup from 'yup';
import Post from '../models/Post';

class PostsController {
  async store(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string()
        .min(3)
        .max(48)
        .required(),
      category_id: Yup.number().required(),
      content: Yup.string().required(),
      author: Yup.string().required(),
      keywords: Yup.string(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const postExist = await Post.findOne({
      where: { title: req.body.title },
    });
    if (postExist) {
      return res
        .status(400)
        .json({ error: 'Post with this title already exists.' });
    }
    const { id, title, content, keywords } = await Post.create(req.body);
    return res.json({
      id,
      title,
      content,
      keywords,
    });
  }

  async index(req, res) {
    const categories = await Post.findAll({
      attributes: [
        'id',
        'title',
        'content',
        'author',
        'created_at',
        'updated_at',
      ],
    });
    return res.json(categories);
  }

  async show(req, res) {
    const categories = await Post.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'title',
        'content',
        'author',
        'created_at',
        'updated_at',
      ],
    });
    return res.json(categories);
  }
}

export default new PostsController();
