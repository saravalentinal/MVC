// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** USAMOS EL MULTER ***/ 
const storage = multer.diskStorage({
    destination: (req,file, cb) =>{
        cb (null, 'public/images/products')
    },
    filename: (req,file,cb) =>{
        console.log(file);
        const nuevoNombre = 'nombre_imagen' + Date.now() + path.extname(file.originalname);
        cb (null, nuevoNombre);
        console.log (nuevoNombre);
    }
})
const upload = multer ({storage})


/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', productsController.create); 
router.post('/', upload.single('imagen-producto'),productsController.store); 


/*** GET ONE PRODUCT ***/ 
router.get('/detail/:id', productsController.detail); 

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id', productsController.update); 


/*** DELETE ONE PRODUCT ***/ 
router.delete('/detail/:id', productsController.destroy); 


module.exports = router;
