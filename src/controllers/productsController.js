const fs = require('fs');
const path = require('path');
const multer = require('multer');
const { log } = require('console');
const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {products});
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		
		let idProducto = req.params.id;
		res.render('detail',{"productoSeleccionado": products[idProducto-1]});
	},

	// Create - Form to create
	create: (req, res) => {

		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let productosActuales = fs.readFileSync(productsFilePath, 'utf-8')
		productosActuales = JSON.parse(productosActuales)
		let newProduct = req.body;
		newProduct.image = req.file.filename;
		let ultimoIndice = productosActuales.length+1;
		newProduct.id = ultimoIndice;
		productosActuales.push(newProduct)
		let newProductoJSON = JSON.stringify(productosActuales)
		//const nuevaVariableJSON = JSON.stringify(newProduct)
		fs.writeFileSync(productsFilePath, newProductoJSON)
		//products.push(newProductoJSON);
		res.redirect('products')
	},
	// Update - Form to edit
	edit: (req, res) => {
		let idProducto = req.params.id;
		//console.log (idProducto);
		res.render('product-edit-form',{"productoSeleccionado": products[idProducto-1]});
		//this.update()

	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		
		let id = req.params.id;
		let infoForm=req.body;
		

		products.forEach(function (elemento){
			if (elemento.id == id)
			{
				elemento.name = infoForm.name;
				elemento.price = infoForm.price;
				elemento.discount = infoForm.discount;
				elemento.category = infoForm.cetegory;
				elemento.description = infoForm.description;
			}
		})
	
		fs.writeFileSync(productsFilePath,JSON.stringify(products))

		res.redirect('/')

		//console.log(infoForm)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		// Do the magic
		let idProducto = req.params.id;
		
		const nuevoProducto = products.filter(function(producto){
			return producto.id != idProducto;
		})
		//console.log (nuevoProducto)

		fs.writeFileSync(productsFilePath,JSON.stringify(nuevoProducto))

		res.redirect('/')

	}
};

module.exports = controller;