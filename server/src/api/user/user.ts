import { Router } from 'express';
import Category from '../../entities/Category';
import User from '../../entities/User';
import authenticate from '../../middlewares/authenticate';

const UserRouter = Router();

UserRouter.use(authenticate);

UserRouter.get('/me', async (req, res) => {
  const id = req.userId;
  if (!id) return;

  const user = await User.findOne({
    where: {
      id,
    },
    relations: ['categories'],
  });

  console.log(user);

  if (!user) return res.status(404).send({ error: 'Invalid user. ' });

  res.status(200).send(user.toJson());
});

UserRouter.get('/categories', async (req, res) => {
  const id = req.userId;
  if (!id) return;

  const user = await User.findOne({
    where: {
      id,
    },
    relations: ['categories'],
  });

  if (!user) return res.status(404).send({ error: 'Invalid user. ' });

  res.status(200).send(user.categories.map((e) => e.toJson()));
});

UserRouter.get('/category', async (req, res) => {
  const categoryId = req.query.category;

  if (typeof categoryId !== 'string') return;

  const category = await Category.findOne({
    where: {
      id: parseInt(categoryId),
    },
    relations: ['owner', 'goals'],
  });

  if (!category) return res.status(404).send({ error: 'Invalid category. ' });

  const id = req.userId;

  if (category.owner.id !== id) return res.status(403).send({ error: 'No ownership of category. ' });

  return res.status(200).send(category.toJson());
});

UserRouter.post('/category/create', async (req, res) => {
  const id = req.userId;
  const { name } = req.body;

  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) return res.status(404).send({ error: 'Invalid user. ' });

  const category = Category.create({
    name,
    owner: user,
    goals: [],
  });

  await user.save();
  await category.save();

  return res.status(200).send({ message: `Successfully created category, ${name}` });
});

UserRouter.post('/category/delete', async (req, res) => {
  const userId = req.userId;
  const { id } = req.body;

  const user = await User.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) return res.status(404).send({ error: 'Invalid user. ' });

  const category = await Category.findOne({
    where: {
      id
    }
  });

  category?.remove(); 

  await user.save();
  await category.save();

  return res.status(200).send({ message: `Successfully created category, ${name}` });
}); 

export default UserRouter;
