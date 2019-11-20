import * as Yup from 'yup';
import Category from '../models/Category';

class CategoriesController {
  async store(req, res) {
    const schema = Yup.object().shape({
      category_name: Yup.string()
        .min(3)
        .max(48)
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const categoryExist = await Category.findOne({
      where: { category_name: req.body.category_name },
    });
    if (categoryExist) {
      return res
        .status(400)
        .json({ error: 'Category with this name already exists.' });
    }

    const { id, category_name } = await Category.create(req.body);
    return res.json({
      id,
      category_name,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      category_name: Yup.string()
        .min(3)
        .max(48)
        .required(),
    });
    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { category_name } = req.body;
    const category = await Category.findByPk(req.body.id);

    if (!category) {
      return res
        .status(400)
        .json({ error: `Category not found with identifier ${req.body.id}.` });
    }

    const categoryExist = await Category.findOne({ where: { category_name } });
    if (categoryExist) {
      return res
        .status(400)
        .json({ error: 'Category with this name already exists.' });
    }

    const { id } = await category.update(req.body);
    return res.json({
      id,
      category_name,
    });
  }

  async index(req, res) {
    const categories = await Category.findAll({
      where: {},
      attributes: ['id', 'category_name', 'created_at', 'updated_at'],
    });
    return res.json(categories);
  }

  async show(req, res) {
    const categories = await Category.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'category_name', 'created_at', 'updated_at'],
    });
    return res.json(categories);
  }
}

export default new CategoriesController();
