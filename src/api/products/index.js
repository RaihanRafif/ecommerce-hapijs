const productsHandler = require("./handler")
const routes = require("./routes")

module.exports = {
    name: 'products',
    version: '1.0.0',
    register: async (server, { service, validator }) => {
        const productsHandler = new productsHandler(service, validator)
        server.route(routes(productsHandler))
    }
}