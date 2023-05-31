const { MongoClient } = require("mongodb")
const {fakerES_MX,faker}= require ('@faker-js/faker')

require ('dotenv').config();
const URI = process.env.URI;

async function BasesDedatos(){
    const client = new MongoClient(URI);
 
    try{
        await client.connect()
        const   dbname="entre_especies"
        const db = await client. db(dbname).createCollection("Usuarios", {
            validator: {
               $jsonSchema: {
                  bsonType: "object",
                  title: "usuario validacion",
                  required: [ "idRol", "Nombre","Apellidos","Correo","Estado" ],
                  properties: {
                     idUsuario: {
                         bsonType: "int",
                     },
                     idRol: {
                        bsonType: "int",
                     },
                     Nombre: {
                        bsonType: "string",
                     },
                     Apellidos: {
                      bsonType: "string",
                     },
                     Documento: {
                      bsonType:  "long" ,
                     }, 
                     Contraseña: {
                      bsonType: "string",
                     },
                     Correo: {
                         bsonType: "string",
                     },
                     Estado: {
                         bsonType: "string",
                     },
                     Telefono: {
                      bsonType:  "long",
                     }
                  }
               }
            }
         } )
 
    }catch(e){
        console.log(e)
    }finally{
       await client.close()
    }
 }
//   BasesDedatos( )

// operaciones inserOne  y insertMay

async function InsertarUsuario(Usuario) {
    const client = new MongoClient(URI);
 
    try {
       await client.connect();
       const db = client.db("entre_especies");
       
       const Result = await db.collection("Usuarios").insertOne(Usuario);
       console.log("Usuario registrado");
    } catch (e) {
       console.log(e);
    } finally {
       await client.close();
    }
 }
 
 const usuario = {
    idRol: 1,
    Nombre: "Juan",
    Apellidos: "Osorio",
    Correo: "juan@gmail.com",
    Estado: "inactivo"
 };
 
 InsertarUsuario(usuario);
 






// insertMany

async function insertarusuarios(numeroderegistro){
    const client = new MongoClient(URI);
    try{
        await client.connect()
        const Usuarios = await client.db("entre_especies").collection("Usuarios").find().toArray();
        const Roles = await client.db("entre_especies").collection("roles").find().toArray();
        const datos=[];
        for (let j =1; j<= numeroderegistro ; j++){
          let nombre =fakerES_MX.person.firstName(),apellido=fakerES_MX.person.lastName();
          const dato = {
             idUsuario:Usuarios.length+j,
             idRol:faker.helpers.arrayElement(Roles).idRol,
             Nombre:nombre,
             Apellidos:apellido,
             Documento:faker.number.bigInt({min:10000,max:500000}), 
             Telefono:faker.number.bigInt({min:30000,max:399999}), 
             Contraseña:faker.internet.password(),
             Correo:faker.internet.email({firstName:nombre,lastName:apellido}), 
             Estado:faker.helpers.arrayElement(["activo","inactivo"])
          }
          datos.push(dato)
          console.log(`Se han insertado: ${datos.length} datos`)
        }
        const daticos = await client.db("entre_especies").collection("Usuarios").insertMany(datos);
        console.log(`todos los datos han sido agregados exitosamente`)
       
    }catch(e){
        console.log(e)
    }finally{
       await client.close()
    }
 }
 // insertarusua(
 //     2000 
 // )


 // operaciones find  y findone
async function buscar(BuscarUsuario){
    const client = new MongoClient(uri);
    
    try{
        await client.connect()
        const resultado = await client.db("entre_especies").collection("Usuarios").find({Nombre:BuscarUsuario});
        const result = await resultado.toArray(); //en esta linea nesesitamos comvertir nuetro resultado en un  array normal  para recorrer y encontar los datos almacenados 
        if(result){
            console.log(`se encontro un usuario con los siguiente Datos: ${BuscarUsuario}`);
            console.log(result)
        }else{
            console.log(`no se encontro el Usuario `);
        }
    }catch(e){
        console.log(e)
    }finally{
       await client.close()
    }
}
// buscar(
//     "Julia"

// )

async function buscar(BuscarUsuario){
   const client = new MongoClient(uri);

   try{
       await client.connect()
       const resultado = await client.db("entre_especies").collection("Usuarios").findOne({Nombre:BuscarUsuario});
       if(resultado){
           console.log(`se encontro un usuario con los siguiente Datos: ${BuscarUsuario}`);
           console.log(resultado)
       }else{
           console.log(`no se encontro el Usuario `);
       }
   }catch(e){
       console.log(e)
   }finally{
      await client.close()
   }
}

// buscar(
//     "Juan Pablo"

// )



// updaOne (con y sin upsert)

// updateMany (con y sin upsert)

async function actualizar(idUsuario, nuevosDatos, upsert = false) {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("Usuarios");
      const filter = { _id: ObjectId(idUsuario) };
      const update = { $set: nuevosDatos };
      const options = { upsert: upsert };
      const result = await collection.updateOne(filter, update, options);
  
      if (result.matchedCount > 0) {
        console.log(`Se actualizó el documento con el ID: ${idUsuario}`);
      } else {
        console.log(`No se encontró ningún documento con el ID: ${idUsuario}`);
      }
  
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
  
  // Ejemplo de uso de actualizar sin upsert
  const idUsuario = "1"; // ID del documento que deseas actualizar
  const nuevosDatos = { Estado: "activo" }; // Nuevos datos a actualizar
  
//   actualizar(idUsuario, nuevosDatos);
  
  // Ejemplo de uso de actualizar con upsert
  const idUsuario2 = "2"; // ID del documento que deseas actualizar o insertar
  const nuevosDatos2 = { Estado: "inactivo" }; // Nuevos datos a actualizar o insertar
  
//   actualizar(idUsuario2, nuevosDatos2, true);



  async function actualizarMuchos(query, nuevosDatos, upsert = false) {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("Usuarios");
      const update = { $set: nuevosDatos };
      const options = { upsert: upsert };
      const result = await collection.updateMany(query, update, options);
  
      console.log(`${result.modifiedCount} documentos modificados`);
  
      if (upsert) {
        console.log(`${result.upsertedCount} documentos insertados`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
  
  // Ejemplo de uso de actualizarMuchos sin upsert
  const query = { Estado: "inactivo" }; // Query para seleccionar los documentos a actualizar
  const nuevosDatos3 = { Estado: "activo" }; // Nuevos datos a actualizar
  
//   actualizarMuchos(query, nuevosDatos);
  
  // Ejemplo de uso de actualizarMuchos con upsert
  const query2 = { idUsuario: 2001 }; // Query para seleccionar los documentos a actualizar
  const nuevosDatos4 = { Estado: "activo" }; // Nuevos datos a actualizar
  
//   actualizarMuchos(query2, nuevosDatos2, true);
  

  async function eliminarUno(idUsuario) {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("Usuarios");
      const filter = { _id: ObjectId(idUsuario) };
      const result = await collection.deleteOne(filter);
  
      if (result.deletedCount > 0) {
        console.log(`Se eliminó el documento con el ID: ${idUsuario}`);
      } else {
        console.log(`No se encontró ningún documento con el ID: ${idUsuario}`);
      }
  
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
//   eliminarUno("1");
  
  async function eliminarMuchos() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("Usuarios");
      const filter = { Estado: "activo" };
      const result = await collection.deleteMany(filter);
  
      if (result.deletedCount > 0) {
        console.log(`${result.deletedCount} documentos eliminados`);
      } else {
        console.log("No se encontraron documentos para eliminar");
      }
  
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
    
  // Ejemplo de uso de eliminarMuchos
//   eliminarMuchos( 2000);



async function eliminarColeccion() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("Usuarios");
      const result = await collection.drop();
  
      console.log(`Se eliminó la colección "Usuarios"`);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
  
  // Llamar a la función para eliminar la colección
//   eliminarColeccion();
  
  
async function eliminarBaseDeDatos() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const db = client.db("entre_especies");
      const result = await db.dropDatabase();
  
      console.log(`Se eliminó la base de datos "entre_especies"`);
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
  
async function consultarUsuarios() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const usuariosCollection = client.db("entre_especies").collection("Usuarios");
    const resultado = await usuariosCollection.aggregate([
      {
        $lookup: {
          from: "roles", 
          localField: "idRol",
          foreignField: "idRol",
          as: "Nombre",
        },
      },
      {
        $project: { "Apellidos": true, "Estado": true,"Nombre.NomRol": true },
      },
      {
        $limit: 1,
      },
    ]).toArray();

    console.log(JSON.stringify(resultado));
    
  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

consultarUsuarios();

