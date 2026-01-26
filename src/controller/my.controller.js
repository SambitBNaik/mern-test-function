
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