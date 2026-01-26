
export const geyMyName = async(req, res) =>{
    try {
        const { name } = req.body;
        if(!name){
            return res.status(401).json({ message: 'Please enter your name'});
        }

        return res.status(200).json({ message:`My name is  ${name}`});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getMyFullName= async()=>{
    try {
        const { fullName, middlName, lastName} = req.body;

        if(!fullName || !lastName){
            res.status(401).json({ message:'Please provide the fullName or lastName'});
        }

        res.status(200).json({ message:`My fullname is ${fullName} ${middlName} ${lastName}`});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}