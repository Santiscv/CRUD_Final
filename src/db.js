const mysql= require('mysql2');
const db= mysql.createConnection({
    //host : 'localhost', 
    //cada vez que se levante una instancia de contenedor de esta imagen, verifique en el compose el nombre.
    //se conecta a un contenedor llamado mysql
    host: "mysql",
    user: 'root',
    password : 'Jaimito_351',
    multipleStatements: true,
});

//conectarnos al servidor
db.connect((err)=>{
    if (err){
        console.log ('Error en la conexion del servidor')
        return;
    }
    // veriificar si existe la base de datos
    db.query('CREATE DATABASE IF NOT EXISTS CRUD_DB', (err)=>{
        if (err){
            console.log('Error al crear la base de datos')
            return;
        }
        console.log('DB creada con exito.')
    });
    //seleccionar base de datos
    db.query('USE CRUD_DB', (err)=>{
        if (err){
            console.log('Error al seleccionar la DB')
            return;
        }
        console.log('Conexion exitosa')
    });
    //verificar si existe la tabla personas
    const createTableSQL= `
        CREATE TABLE IF NOT EXISTS Oficina(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        denominacion VARCHAR(255)
        );

        CREATE TABLE IF NOT EXISTS Persona(
        id INT AUTO_INCREMENT PRIMARY KEY, 
        nombre VARCHAR(255) NOT NULL, 
        email VARCHAR(255) NOT NULL,
        oficina_id INT NOT NULL,
        FOREIGN KEY (oficina_id) REFERENCES Oficina(id)
        );

    `;
    db.query(createTableSQL, (err)=>{
        if (err){
            console.log(err)
            return;
        }        
    });

});

module.exports=db;







