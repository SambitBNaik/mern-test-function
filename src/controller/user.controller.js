import User from "../models/user.model.js";


export const createUser = async(req, res)=>{
    try {
        const {name, email, password } = req.body;

        if(!name || !email || !password){
            return res.status(400).json({message: 'Please provide the email, name, password'});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists.'});
        }

        await User.create({
            name,
            email,
            password: password
        });

        User.save();

        res.status(200).json({ message:"User created successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}