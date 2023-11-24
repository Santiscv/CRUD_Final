var express = require('express');
var db = require('../db')

//--------------------Persona------------------------

const List_Persona = (req, res, next) => {
   // para llamar a la base de datos
    const db = req.app.get("db");
     // hace referencia a la consulta a la base de datos
    const query = "SELECT Persona.id, Persona.nombre, Persona.email, Persona.oficina_id, Oficina.denominacion FROM Persona LEFT JOIN Oficina ON Persona.oficina_id = Oficina.id";
     // hace correr la consulta
    db.query(query, function(error, filas) {
        if (error) {
            console.log(error);
            return;
        }

        // Renderizar la vista "index" y pasa los datos de personas
        res.render("index", { Persona: filas });
    });
};

const Get_Agregar_Persona = (req, res, next) =>{
  const db = req.app.get("db");
  const queryOficinas = "SELECT id, denominacion FROM Oficina";
  db.query(queryOficinas, (err, oficinas) => {
    if (err) {
      console.log(err);
      return;
    }
  const queryPersonas = "SELECT id, nombre, email FROM Persona";
  db.query(queryPersonas, (errpersonas, personas) => {
      if (errpersonas) {
        console.log(errpersonas);
        return;
      }
      
      res.render('agregar', { oficinas, personas });
    });
  });
};


const Post_Agregar_Persona =  (req, res, next) => {
  const db = req.app.get("db");
  const nombre = req.body.nombre;
  const email = req.body.email;
  const oficina_id = req.body.oficina; 
  const query = "INSERT into Persona (nombre, email, oficina_id) VALUES (?,?,?)";
  db.query(query, [nombre, email, oficina_id], function (err) {
      if (err) {
          console.log(err);
          return;
      }
      res.redirect("/");
  });
};


const Get_Editar_Persona = (req, res, next) => {
  const db = req.app.get("db");
  const id = req.params.id;
  const personaquery = "SELECT * FROM Persona WHERE id = ?";
  const oficinasquery = "SELECT id, denominacion FROM Oficina";

  db.query(personaquery, id, function (err, personas) {
    if (err) {
      console.log(err);
      return;
    }
    db.query(oficinasquery, function (err, oficinas) {
      if (err) {
        console.log(err);
        return;
      }
      
      // Renderiza la vista de edición con los datos de la persona y la lista de oficinas
      res.render("edit", { item: personas[0], oficinas });
    });
  });
};


const Post_Editar_Persona =  (req, res, next) => {
  const db = req.app.get("db");
  const id = req.params.id;
  const nombre = req.body.nombre;
  const email = req.body.email;
  const oficina_id = req.body.oficina;

  const query = "UPDATE Persona SET nombre=?, email=?, oficina_id=? WHERE id=?";
  db.query(query, [nombre, email, oficina_id, id], function (err) {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al actualizar datos de la persona");
    }
    res.redirect("/");
  });
};

const Get_Buscar_Persona= (req, res, next) => {
  res.render("busqueda_persona");

};

const Post_Buscar_Persona = (req, res, next)=> {
  const db = req.app.get("db");
  const keyword = req.body.keyword;
  const query = "SELECT Persona.id, Persona.nombre, Persona.email, Persona.oficina_id, Oficina.denominacion FROM Persona LEFT JOIN Oficina ON Persona.oficina_id = Oficina.id WHERE Persona.nombre LIKE ?";
  db.query(query, [`%${keyword}%`], (err, rows) => {
      if (err) throw err;
      res.render('resultados_persona', {personas: rows});
  });
};


const Get_Borrar_Persona= (req, res, next) => {
  const db = req.app.get("db");
  const id= req.params.id;
  const query = "SELECT * FROM Persona WHERE id=?";
  db.query(query, id, function(err, filas) {
    if (err) {
      console.log(err);
      return;
    }
    res.render('borrar_persona', {item: filas[0]});
    });
};


const Post_Borrar_Persona =(req, res, next) =>{
  const db = req.app.get('db');
  const id = req.params.id;
  db.query("DELETE FROM Persona WHERE id=?", id, function(err) {
      if (err) {
          console.error(err);
          return;
      }
      res.redirect('/');
  });
}


//-------------------Oficina------------------

const List_Oficina = (req, res, next) => {
  // para llamar a la base de datos
  const db= req.app.get("db");
  // hace referencia a la consulta a la base de datos
  const query= "SELECT id, denominacion FROM Oficina";
  // hace correr la consulta
  db.query(query, function(error, filas){
    if (error){
      console.log(error);
      return;
    }
      // renderiza en una plantilla
    res.render("oficina_lista", {oficina_lista:filas})
  })
};

const Get_Agregar_Oficina= (req, res, next) => {
  res.render('agregar_oficina', { });
};


const Post_Agregar_Oficina = (req, res, next) =>{
  const db = req.app.get("db");
  const denominacion = req.body.denominacion;
  const insertQuery = "INSERT into Oficina (denominacion) VALUES (?)";
  db.query(insertQuery, denominacion, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    // Redirige después de la inserción
    res.redirect("/oficina");
  });
};

const Get_Editar_Oficina=  (req, res, next)=>{
  const db = req.app.get("db");
  const id= req.params.id;
  const query = "SELECT * FROM Oficina WHERE id = ?";
  db.query(query, id, function(err, fila) {
    if (err) {
      console.log(err);
      return;
    }
    res.render("edit_oficina", { item: fila[0] })
    });
};


const Post_Editar_Oficina=(req, res, next)=>{
  const db = req.app.get("db");
  const id= req.params.id;
  const denominacion = req.body.denominacion;
  const query = "UPDATE Oficina SET denominacion = ? WHERE id = ?";
  db.query(query, [denominacion, id], function(err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/oficina");
    });
};

const Get_Buscar_Oficina= (req, res, next) => {
  res.render("busqueda_oficina");

};

const Post_Buscar_Oficina = (req, res, next)=> {
  const db = req.app.get("db");
  const keyword = req.body.keyword;
  const query = "SELECT * FROM Oficina WHERE denominacion LIKE ?";
  db.query(query, [`%${keyword}%`], (err, rows) => {
      if (err) throw err;
      res.render('resultados_oficina', {oficina: rows});
  });
};

const Get_Borrar_Oficina= (req, res, next) =>{
  const db = req.app.get("db");
  const id= req.params.id;
  const query = "SELECT * FROM Oficina WHERE id=?";
  db.query(query, id, function(err, filas) {
    if (err) {
      console.log(err);
      return;
    }
    res.render('borrar_oficina', {element: filas[0]});
    });
};


const Post_Borrar_Oficina = (req, res, next) =>{
  const db = req.app.get("db");
  const id = req.params.id;
  const query = "DELETE FROM Oficina WHERE id = ?";
  db.query(query, id, function (err) {
    if (err) {
      console.log(err);
      return;
    }
    res.redirect("/oficina");
  });
};


  



module.exports={
    List_Persona,
    Get_Agregar_Persona,
    Post_Agregar_Persona,
    Get_Editar_Persona,
    Post_Editar_Persona,
    Get_Buscar_Persona,
    Post_Buscar_Persona,
    Get_Borrar_Persona,
    Post_Borrar_Persona,
    List_Oficina,
    Get_Agregar_Oficina,
    Post_Agregar_Oficina,
    Get_Editar_Oficina,
    Post_Editar_Oficina,
    Get_Buscar_Oficina,
    Post_Buscar_Oficina,
    Get_Borrar_Oficina,
    Post_Borrar_Oficina,
};
