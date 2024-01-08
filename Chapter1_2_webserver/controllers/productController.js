const Product = class {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}

const productArr = [
    new Product(1, "product 1", 12),
    new Product(2, "product 2", 13),
    new Product(3, "product 3", 14),
    new Product(4, "product 4", 15),
];

const getAllProducts = async (req, res) => {
    try {
        if (productArr.length == 0) {
            throw "array empty";
        }
        res.status(200).json({ statusCode: 200, data: productArr });
    } catch (err) {
        res.status(500).json({ message: `error found! ${err}` });
    }

}
export default getAllProducts;
