import User from '../models/user';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    try {
        console.log(req.body);
    const { name, email, password } = req.body;

    //validation
    if (!name) {
        return res.status(400).send("Please enter a name")
    }
    if (!password || password.length < 6) {
        return res.status(400).send("Password should be minimum 6 characters")
    }
    let userExist = await User.findOne({ email: email }).exec()
    if (userExist) {
        return res.status(400).send("This email already exists")
    }
    //save registered user
    const user = new User(req.body)
    
        await user.save()
        console.log("USER CREATED", user)
        return res.json({ok: user})
    } catch (error) {
        console.log("COULD NOT CREATE USER", error)
        return res.status(400).send("Error. Please try again.")
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        //check if user email exist
        let user = await User.findOne({ email }).exec();
        console.log("USER EXISTS", user);
        if(!user){
            return res.status(400).send("User not found")
        }
        //compare password
        user.comparePassword(password, (error, match) => {
            console.log("COMPARE PASSWORD IN LOGIN", error);
            if(!match || error) {
                return res.status(400).send("Wrong password");
            }
            let token = jwt.sign({_id: user._id, name: user.name}, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            res.json({ token, userInfo: {
                _id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                stripe_account_id: user.stripe_account_id,
                stripe_seller: user.stripe_seller,
                stripeSession: user.stripeSession
            } })
        })
    } catch (error) {
        console.log("LOGIN ERROR", error)
        res.status(400).send("Cannot sign in")
    }
}