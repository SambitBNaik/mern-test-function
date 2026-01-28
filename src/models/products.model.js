import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        min: 0
    },
    quantity:{
        type: Number,
        default: 0
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{ timestamps : true });

// index for aggregation speed

productSchema.index({ category: 1});
productSchema.index({ price: 1});

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;