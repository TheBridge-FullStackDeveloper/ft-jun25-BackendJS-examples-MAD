const { Product, saveProduct } = require("../models/products.model");

// READ
const getProduct = async (req, res) => {
  try {
    const id = req.params.id;
    let products = id
      ? await Product.findOne({ id }, "-_id -__v").populate(
          "provider",
          "-_id -__v"
        ) 
      : await Product.find({}, "-_id -__v").populate("provider", "-_id -__v"); //{}
      
    products = products || {}; // en caso de null

    res.status(200).render('products',{
        products, 
        msj:"Tus productos!!"
    })
  } catch (error) {
    console.log(`ERROR: ${error.stack}`);
    res.status(400).json({ msj: `ERROR: ${error.stack}` });
  }
};

module.exports = {
  getProduct
};
