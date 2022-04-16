import Router from 'express'; 
import User from '../../entities/User';

const AccountRouter = Router(); 

AccountRouter.post('/signup', async (req, res) => {
    console.log(req);
    const { username, password } = req.body; 

    const existingUser = await User.findOne({
        where: {
            username
        }
    }); 

    if (existingUser) return res.status(400).send({message: "Existing user already exists with this username. "}); 

    const newUser = User.create({
        username, password
    }); 

    await newUser.save(); 

    res.status(200).send({message: "Successfully created user. "}); 
}); 

AccountRouter.post('/login', async (req, res) => {

}); 

export default AccountRouter;