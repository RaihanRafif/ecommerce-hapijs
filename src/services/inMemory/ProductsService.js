const { nanoid } = require("nanoid")

class ProductService {
    constructor() {
        this._products = []
    }

    addProduct({ product_name, price, discount, size, stock, description, color, category }) {
        const id = nanoid(16)
        const createdAt = new Date().toISOString()
        const updatedAt = createdAt

        const newProduct = {
            product_name, price, discount, size, stock, description, color, category, createdAt, updatedAt
        }

        this._products.push(newProduct)

        const isSuccess = this._products.filter((product) => id === product.id).length > 0

        if (!isSuccess) {
            throw new Error('Failed when add new product');
        }

        return id;
    }

    getProducts() {
        return this._products
    }

    getProductById(id) {
        const product = this._products.filter((product) => product.id === id)[0]
        if (!product) {
            throw new Error('Catatan tidak ditemukan');
        }
        return product;
    }

    editProductById(id, { product_name, price, discount, size, stock, description, color, category }) {
        const index = this._products.findIndex((product) => product.id === id)

        if (index === -1) {
            throw new Error('Update product failed. id not Found!');
        }

        const updatedAt = new Date().toISOString();

        this._products[index] = {
            ...this._products[index],
            product_name,
            price,
            discount,
            size,
            stock,
            description,
            color,
            category,
            updatedAt,
        };
    }

    deleteProductById(id) {
        const index = this._products.findIndex((product) => product.id === id);
        if (index === -1) {
            throw new Error('Catatan gagal dihapus. Id tidak ditemukan');
        }
        this._products.splice(index, 1);
    }
}

module.exports = ProductService