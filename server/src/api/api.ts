import Router from 'express'; 
import AccountRouter from './account/account.router'; 

const ApiRouter = Router(); 

ApiRouter.use('/account', AccountRouter); 

ApiRouter.use((req, res, next) => {
    // console.log(req);
    next();
}); 

export default ApiRouter;