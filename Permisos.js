const { MongoClient } = require("mongodb")
const {fakerES_MX,faker}= require ('@faker-js/faker')

require ('dotenv').config();
const URI = process.env.URI;

async function BasesDedatos(){
    const client = new MongoClient(URI);
 
    try{
        await client.connect()
        const   dbname="entre_especies"
        const db = await client. db(dbname).createCollection("Permisos", {
            validator: {
               $jsonSchema: {
                  bsonType: "object",
                  title: "usuario validacion",
                  required: [ "idPermiso","Nompermiso" ],
                  properties: {
                     idPermiso: {
                         bsonType: "int",
                     },
                     Nompermiso: {
                        bsonType: "string",
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
//   BasesDedatos();

async function insertar(Permisos){
    const client = new MongoClient(uri);
 
    try{
        await client.connect()
        const result = await client.db("entre_especies").collection("Permisos").insertOne(Permisos);
        console.log(`se creo un nuevo permiso:${result.insertedId}`);
        console.log(rol)
       
    }catch(e){
        console.log(e)
    }finally{
       await client.close()
    }
 }
 // insertar({ })
 
 
 async function insertar(Permisos) {
    const client = new MongoClient(URI);
 
    try {
        await client.connect();
        const result = await client.db("entre_especies").collection("permisos").insertMany([Permisos]);
        console.log(`Se crearon nuevos Permisos: ${result.insertedIds}`);
        console.log(rol);
       
    } catch (e) {
        console.log(e);
    } finally {
       await client.close();
    }
 }
 
 // insertar({});
 
 // operaciones find  y findone
 
 
 async function buscarPermiso() {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("permisos");
     const roles = await collection.find().toArray();
 
     console.log("permisos encontrados:");
     console.log(roles);
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
 // buscarPermisos();
 
 
 
 async function buscarPermiso(idPermiso) {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("Permisos");
     const rol = await collection.findOne({ _id: idPermiso });
 
     if (rol) {
       console.log("Permiso encontrado:");
       console.log(rol);
     } else {
       console.log(`No se encontró ningún Permiso con el ID: ${idPermiso}`);
     }
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
 // buscarPermiso("1");
 
 
 
 
 // updaOne (con y sin upsert)
 
 async function actualizar(idPermiso, nuevosDatos, upsert = false) {
     const client = new MongoClient(URI);
   
     try {
       await client.connect();
       const collection = client.db("entre_especies").collection("Permisos");
       const filter = { _id: ObjectId(idUsuario) };
       const update = { $set: nuevosDatos };
       const options = { upsert: upsert };
       const result = await collection.updateOne(filter, update, options);
   
       if (result.matchedCount > 0) {
         console.log(`Se actualizó el Permiso con el ID: ${idPermiso}`);
       } else {
         console.log(`No se encontró ningún Permiso con el ID: ${idPermiso}`);
       }
   
       console.log(result);
     } catch (e) {
       console.log(e);
     } finally {
       await client.close();
     }
   }
     
 //   actualizar();
 
 
 
   async function actualizarMuchos(query, nuevosDatos, upsert = false) {
     const client = new MongoClient(uri);
   
     try {
       await client.connect();
       const collection = client.db("entre_especies").collection("Permisos");
       const update = { $set: nuevosDatos };
       const options = { upsert: upsert };
       const result = await collection.updateMany(query, update, options);
   
       console.log(`${result.modifiedCount} Permisos modificados`);
   
       if (upsert) {
         console.log(`${result.upsertedCount} Permisos insertados`);
       }
     } catch (e) {
       console.log(e);
     } finally {
       await client.close();
     }
   }
   
   
 //   actualizarMuchos();
   
 
 async function eliminarRolPorId(idPermiso) {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("roles");
     const result = await collection.deleteOne({ _id: idPermiso });
 
     if (result.deletedCount > 0) {
       console.log(`Se eliminó el Permiso con el ID: ${idPermiso}`);
     } else {
       console.log(`No se encontró ningún Permiso con el ID: ${idPermiso}`);
     }
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
 // eliminarRolPorId("1");
 
   
 
 async function eliminarPermisoPorNombre(nombrePermiso) {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("Permisos");
     const result = await collection.deleteMany({ NomRol: nombrePermiso });
 
     if (result.deletedCount > 0) {
       console.log(`Se eliminaron ${result.deletedCount} Permisos con el nombre: ${nombrePermiso}`);
     } else {
       console.log(`No se encontraron Permiso con el nombre: ${nombrePermiso}`);
     }
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
//  eliminarPermisoPorNombre("");
 
 
 
 
 async function eliminarColeccion() {
     const client = new MongoClient(uri);
   
     try {
       await client.connect();
       const collection = client.db("entre_especies").collection("Permisos");
       const result = await collection.drop();
   
       console.log(`Se eliminó la colección "Permisos"`);
       console.log(result);
     } catch (e) {
       console.log(e);
     } finally {
       await client.close();
     }
   }
   
 
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
 //   eliminarBaseDeDatos();
 
 // ejemplo de limit
 
 async function obtenerPermisos(limit) {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("Permisos");
     const roles = await collection.find().limit(limit).toArray();
 
     console.log("Permisos obtenidos:");
     console.log(roles);
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
 // obtenerRoles(5); 
 
 // ejemplo de:unwind
 
 async function unwindPermisos() {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("Permisos");
     const result = await collection.aggregate([
       { $unwind: "$roles" }
     ]).toArray();
 
     console.log("Permisos desagregados:");
     console.log(result);
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
 // unwindRoles();
 
 // ejemplo de sort
 async function sortRoles() {
   const client = new MongoClient(URI);
 
   try {
     await client.connect();
     const collection = client.db("entre_especies").collection("Permisos");
     const result = await collection.aggregate([
       { $sort: { NomRol: 1 } } // Orden ascendente por el campo NomRol
     ]).toArray();
 
     console.log("Permisos ordenados:");
     console.log(result);
   } catch (e) {
     console.log(e);
   } finally {
     await client.close();
   }
 }
 
 // sortRoles();
 
 
 
 