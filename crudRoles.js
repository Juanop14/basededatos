const { MongoClient,ObjectId } = require("mongodb");


require ('dotenv').config();
const URI = process.env.URI;

async function BasesDedatos(){
    const client = new MongoClient(URI);

    try{
        await client.connect()
        const   dbname="entre_especies"
        const db = await client. db(dbname).createCollection("roles", {
            validator: {
               $jsonSchema: {
                  bsonType: "object",
                  title: "Roles validacion",
                  required: [ "idRol", "NomRol" ],
                  properties: {
                     idRol: {
                        bsonType: "int",
                     },
                     NomRol: {
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
// BasesDedatos()

async function insertar(rol){
   const client = new MongoClient(uri);

   try{
       await client.connect()
       const result = await client.db("entre_especies").collection("roles").insertOne(rol);
       console.log(`se creo un nuevo rol:${result.insertedId}`);
       console.log(rol)
      
   }catch(e){
       console.log(e)
   }finally{
      await client.close()
   }
}
// insertar({
//   idRol:1,
//   NomRol:"Administrador"
// })


async function insertar(rol) {
   const client = new MongoClient(URI);

   try {
       await client.connect();
       const result = await client.db("entre_especies").collection("roles").insertMany([rol]);
       console.log(`Se crearon nuevos roles: ${result.insertedIds}`);
       console.log(rol);
      
   } catch (e) {
       console.log(e);
   } finally {
      await client.close();
   }
}

// insertar({
//   idRol: 1,
//   NomRol: "Administrador",
//   idRol: 2,
//   NomRol: "Adm"

// });

// operaciones find  y findone


async function buscarRoles() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const collection = client.db("entre_especies").collection("roles");
    const roles = await collection.find().toArray();

    console.log("Roles encontrados:");
    console.log(roles);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

// buscarRoles();



async function buscarRolPorId(idRol) {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const collection = client.db("entre_especies").collection("roles");
    const rol = await collection.findOne({ _id: idRol });

    if (rol) {
      console.log("Rol encontrado:");
      console.log(rol);
    } else {
      console.log(`No se encontró ningún rol con el ID: ${idRol}`);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

// buscarRolPorId("1");




// updaOne (con y sin upsert)

async function actualizar(idRol, nuevosDatos, upsert = false) {
    const client = new MongoClient(URI);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("Roles");
      const filter = { _id: ObjectId(idUsuario) };
      const update = { $set: nuevosDatos };
      const options = { upsert: upsert };
      const result = await collection.updateOne(filter, update, options);
  
      if (result.matchedCount > 0) {
        console.log(`Se actualizó el rol con el ID: ${idRol}`);
      } else {
        console.log(`No se encontró ningún rol con el ID: ${idRol}`);
      }
  
      console.log(result);
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
    
//   actualizar(idUsuario2, nuevosDatos2, true);



  async function actualizarMuchos(query, nuevosDatos, upsert = false) {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("roles");
      const update = { $set: nuevosDatos };
      const options = { upsert: upsert };
      const result = await collection.updateMany(query, update, options);
  
      console.log(`${result.modifiedCount} Roles modificados`);
  
      if (upsert) {
        console.log(`${result.upsertedCount} Roles insertados`);
      }
    } catch (e) {
      console.log(e);
    } finally {
      await client.close();
    }
  }
  
  
//   actualizarMuchos();
  

async function eliminarRolPorId(idRol) {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const collection = client.db("entre_especies").collection("roles");
    const result = await collection.deleteOne({ _id: idRol });

    if (result.deletedCount > 0) {
      console.log(`Se eliminó el rol con el ID: ${idRol}`);
    } else {
      console.log(`No se encontró ningún rol con el ID: ${idRol}`);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

// eliminarRolPorId("1");

  

async function eliminarRolesPorNombre(nombreRol) {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const collection = client.db("entre_especies").collection("roles");
    const result = await collection.deleteMany({ NomRol: nombreRol });

    if (result.deletedCount > 0) {
      console.log(`Se eliminaron ${result.deletedCount} roles con el nombre: ${nombreRol}`);
    } else {
      console.log(`No se encontraron roles con el nombre: ${nombreRol}`);
    }
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

eliminarRolesPorNombre("Administrador");




async function eliminarColeccion() {
    const client = new MongoClient(uri);
  
    try {
      await client.connect();
      const collection = client.db("entre_especies").collection("roles");
      const result = await collection.drop();
  
      console.log(`Se eliminó la colección "roles"`);
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

async function obtenerRoles(limit) {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const collection = client.db("entre_especies").collection("roles");
    const roles = await collection.find().limit(limit).toArray();

    console.log("Roles obtenidos:");
    console.log(roles);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

// obtenerRoles(5); 

// ejemplo de:unwind

async function unwindRoles() {
  const client = new MongoClient(URI);

  try {
    await client.connect();
    const collection = client.db("entre_especies").collection("roles");
    const result = await collection.aggregate([
      { $unwind: "$roles" }
    ]).toArray();

    console.log("Roles desagregados:");
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
    const collection = client.db("entre_especies").collection("roles");
    const result = await collection.aggregate([
      { $sort: { NomRol: 1 } } // Orden ascendente por el campo NomRol
    ]).toArray();

    console.log("Roles ordenados:");
    console.log(result);
  } catch (e) {
    console.log(e);
  } finally {
    await client.close();
  }
}

// sortRoles();



