var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', controllers.List_Persona);

router.get('/agregar', controllers.Get_Agregar_Persona);

router.post('/agregar',controllers.Post_Agregar_Persona);

router.get('/editar/:id', controllers.Get_Editar_Persona);

router.post('/editar/:id', controllers.Post_Editar_Persona);

router.get('/buscar_persona', controllers.Get_Buscar_Persona);

router.post('/resultados_persona', controllers.Post_Buscar_Persona);

router.get('/borrar/:id', controllers.Get_Borrar_Persona);

router.post('/borrar/:id', controllers.Post_Borrar_Persona);


//------------------oficina-----------------

router.get('/oficina', controllers.List_Oficina );

router.get('/agregar_oficina', controllers.Get_Agregar_Oficina);

router.post('/agregar_oficina',controllers.Post_Agregar_Oficina);

router.get('/editar_oficina/:id', controllers.Get_Editar_Oficina);

router.post('/editar_oficina/:id', controllers.Post_Editar_Oficina);

router.get('/buscar_oficina', controllers.Get_Buscar_Oficina);

router.post('/resultados_oficina', controllers.Post_Buscar_Oficina);

router.get('/borrar_oficina/:id', controllers.Get_Borrar_Oficina);

router.post('/borrar_oficina/:id', controllers.Post_Borrar_Oficina);




module.exports = router;
