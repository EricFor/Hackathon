import Router from 'express';
import User from '../entities/User';
import AccountRouter from './account/account.router';
import UserRouter from './user/user';
import Category from '../entities/Category';
import Goal from '../entities/Goal';

const ApiRouter = Router();

ApiRouter.use('/account', AccountRouter);
ApiRouter.use('/user', UserRouter);

// ApiRouter.use((req, res, next) => {
//   // console.log(req);
//   next();
// });

export default ApiRouter;
