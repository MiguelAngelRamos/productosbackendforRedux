const productosController = require('../controllers').productos;

module.exports = (app) => {
  app.get('/api/productos', productosController.getProductos);
  app.post('/api/productos', productosController.crearProducto);
  app.get('/api/productos/:id', productosController.getProductoById);
  app.put('/api/productos/:id', productosController.updateProducto);
  app.delete('/api/productos/:id', productosController.deleteProducto);
}