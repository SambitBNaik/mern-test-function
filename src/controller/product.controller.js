import Product from "../models/products.model.js";

export const createProduct = async(req, res)=>{
    try {
        const { name, category, price, quantity} = req.body || {};

        if(!name || !category || price === null ){
            return res.status(400).json({ message:"Missing required fields"});
        }

        const product = await Product({
            name,
            category,
            price,
            quantity
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getProducts = async (req, res) => {
    try {
        let { category, minPrice, maxPrice, page = 1, limit = 10 } = req.query;

        // convert query params to numbers
        page = Number(page);
        limit = Number(limit);

        const pipeline = [];
        const match = {};

        if (category) {
            match.category = category;
        }

        if (minPrice || maxPrice) {
            match.price = {};
            if (minPrice) match.price.$gte = Number(minPrice);
            if (maxPrice) match.price.$lte = Number(maxPrice);
        }

        if (Object.keys(match).length) {
            pipeline.push({ $match: match });
        }

        pipeline.push({ $sort: { createdAt: -1 } });

        pipeline.push(
            { $skip: (page - 1) * limit },
            { $limit: limit }
        );

        const products = await Product.aggregate(pipeline);

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Read single product
export const getProductById = async(req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({ message: "Product not found"});
        }
        res.json({ product});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

//Update product
export const updateProduct = async(req, res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id,req.body,{ new :true, runValidators: true});

        if(!product){
            return res.status(404).json({message : "Product  not found "});
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

// delete product
export const deleteProduct = async(req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product){
            res.status(404).json({ message:"Product not found"});
        }

        res.json({ message:"Product deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: error.message});
    }
}

export const getProductStats = async(req, res)=>{
    try {
        const stats = await Product.aggregate([
            {
                $group:{
                    _id: "$category",
                    totalProducts:{ $sum: 1},
                    avgPrice: { $avg: "$price"},
                    minPrice: { $min: "$price"},
                    maxprice: { $max: "$price"},
                    totalStock: { $sum:"$quantity"}
                }
            },
            { $sort:{ avgPrice: - 1 }}
        ]);
        res.json(stats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}