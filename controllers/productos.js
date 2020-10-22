
const Producto = require('../models/producto');


/* Crear un nuevo producto */

function crearProducto (req, res) {
  let body = req.body;
  let producto = new Producto({
    nombre: body.nombre,
    precioUni: body.precioUni,
  })

 producto.save((err, productoDB)=>{
   if(err){
     return res.status(500).json({
       ok: false,
       err
     })
   }
   res.status(201).json({
     ok: true,
     producto: productoDB
   })
 })
};

/* Obtener todos los productos */
function getProductos(req, res) {
  Producto.find()
    .exec((err, productos) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.json({
        ok: true,
        productos
      });
    })
};

// /* Obtener un producto por id*/

function getProductoById(req, res) {
  // populate: usuario categoria
  let id = req.params.id;

  Producto.findById(id)
          .exec((err, productoDB)=>{
            if(err){
              return res.status(500).json({
                ok: false,
                err
              })
            }
            if(!productoDB){
              return res.status(400).json({
                ok: false,
                err:{
                  message: 'ID no existe'
                }
              })
            }
            res.json({
              ok: true,
              producto: productoDB
            });

          });
};

/* Actualizar el producto*/ 

function updateProducto(req, res){

  let id = req.params.id;
  let body = req.body;
  // verificar que el id exista
  Producto.findById(id, (err, productoDB)=>{
    if(err){
      return res.status(500).json({
        ok: false,
        err:{
          message: 'Hubo un error al intentar buscar por la id'
        }
      })
    }

    if(!productoDB){
      return res.status(400).json({
        ok: false,
        err:{
          message: 'El producto no existe'
        }
      });
    }
    productoDB.nombre = body.nombre;
    productoDB.precioUni = body.precioUni;

    // guardo en la base de datos
    productoDB.save((err, productoGuardado)=>{

      if(err){
        return res.status(500).json({
          ok: false,
          err
        })
      }
      res.json({
        ok: true, 
        producto: productoGuardado
      });
    });
  });
};

/* Borrar Producto */

function deleteProducto(req, res) {
  // aca hay que hacer que disponible pase a falso
  let id = req.params.id;
  Producto.findById(id).remove(err=>{
    if(err){
      return res.status(500).json({
        ok: false,
        err,
        message: 'Error al borrar el producto'
      })
    }
    return res.json({
      ok:true,
      message: 'Producto borrado'
    });
  });
};

// /* Buscar Productos */

// app.get('/productos/buscar/:termino', verificaToken, (req, res)=>{
//   let termino = req.params.termino;
//   // para que la busqueda se más flexible necesitamos usar una expresion regular
//   // el 'i' es para que sea insencible a las mayusculas y minusculas
//   let regex = new RegExp(termino, 'i');

//   Producto.find({nombre: regex})
//           .populate('categoria', 'descripcion')
//           .exec((err, productos)=>{
//             if(err){
//               return res.status(500).json({
//                 ok: false,
//                 err
//               })
//             }

//             res.json({
//               ok:true,
//               productos
//             })
//           })
// });

// /* Borrar un Producto*/

// app.delete('/productos/:id',verificaToken,(req, res) => {
//   // Cambiar el estado de disponible a false
//   let id = req.params.id;
//   Producto.findById(id,(err, productoDB)=>{
//     if(err){
//       return res.status(500).json({
//         ok:false,
//         err
//       })
//     }
//     if(!productoDB){
//       return res.status(400).json({
//         ok:false,
//         err:{
//           message: 'ID no existe'
//         }
//       })
//     }
//     productoDB.disponible = false;
//     productoDB.save((err, productoBorrado)=>{
//       if(err){
//         return res.status(500).json({
//           ok: false,
//           err
//         })
//       }
//       res.json({
//         ok:true,
//         producto:productoBorrado,
//         message: 'Producto borrado'
//       })
//     })
//   })

// });

module.exports = {
  getProductos,
  crearProducto,
  getProductoById,
  updateProducto,
  deleteProducto
};