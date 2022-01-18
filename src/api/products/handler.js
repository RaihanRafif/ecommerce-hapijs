class productsHandler {
    constructor(service, validator) {
        this._service = service
        this._validator = validator

        this.postProductHandler = this.postProductHandler.bind(this);
        this.getProductsHandler = this.getProductsHandler.bind(this);
        this.getProductByIdHandler = this.getProductByIdHandler.bind(this);
        this.putProductByIdHandler = this.putProductByIdHandler.bind(this);
        this.deleteProductByIdHandler = this.deleteProductByIdHandler.bind(this);
    }

    postProductHandler(req, h) {
        try {
            this._validator.validateProductPayload(req.payload)
            const { product_name, price, discount, size, stock, description, color, category } = req.payload

            const productId = this._service.addProduct({ product_name, price, discount, size, stock, description, color, category })

            const response = h.response({
                status: 'success',
                message: 'Add new product success',
                data: {
                    productId
                }
            })
            response.code(201)
            return response
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            })
            response.code(400)
            return response
        }
    }

    getProductsHandler() {
        const products = this._service.getProducts()
        return {
            status: 'success',
            data: {
                products
            }
        }
    }

    getProductByIdHandler(req, h) {
        try {
            const { id } = req.params
            const product = this._service.getProductById(id)

            return {
                status: 'success',
                data: {
                    product
                }
            }
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            })
            response.code(404)
            return response
        }
    }

    putProductByIdHandler(req, h) {
        try {
            this._validator.validateProductPayload(req.payload)
            const { id } = req.params

            this._service.editProductById(id, req.payload)

            return {
                status: 'success',
                message: 'Edit product success',
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message
            })
            response.code(404)
            return response
        }
    }

    deleteProductByIdHandler(req, h) {
        try {
            const { id } = req.params
            this._service.deleteProductById(id)

            return {
                status: 'success',
                message: 'Delete Product success',
            };
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: "Delete product failed. Id not Found!"
            })
            response.code(404)
            return response
        }
    }
}

module.exports = productsHandler