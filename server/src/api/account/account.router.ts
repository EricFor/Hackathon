import Router from 'express';
import User from '../../entities/User';
import { tokens } from '../../middlewares/authenticate';
import crypto from 'crypto';

const AccountRouter = Router();

AccountRouter.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const existingUser = await User.findOne({
    where: {
      username,
    },
  });

  if (existingUser) return res.status(400).send({ error: 'Existing user already exists with this username. ' });

  const newUser = User.create({
    username,
    password,
  });

  await newUser.save();

  res.status(200).send({ message: 'Successfully created user. ' });
});

AccountRouter.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user || user.password !== password) return res.status(404).send({ error: 'Invalid user. ' });

  const existingToken = tokens.getTokenByID(user.id);

  if (existingToken) {
    res.cookie('session', existingToken);
    res.end();
    return;
  }

  const token = Math.random().toString(36).substr(2); 

  tokens.add(token, user.id);
  res.cookie('session', token);
  console.log(token);
  
  res.end();
});

export default AccountRouter;
