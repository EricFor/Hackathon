import Router from 'express';
import AccountRouter from './account/account.router';
import UserRouter from './user/user';

const ApiRouter = Router();

ApiRouter.use('/account', AccountRouter);
ApiRouter.use('/user', UserRouter);

// ApiRouter.use((req, res, next) => {
//   // console.log(req);
//   next();
// });

export default ApiRouter;
