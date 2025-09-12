import mongoose from 'mongoose';
import petModel from './models/Pets.js';
import { petsData } from './petsData.js'; // Importa el array de mascotas

async function seedDatabase() {
  try {
    // Conecta a la base de datos
    await mongoose.connect('mongodb://localhost:27017/AdoptMe', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Conexión exitosa a MongoDB');

    // Elimina todos los documentos existentes en la colección Pets
    await petModel.deleteMany({});
    console.log('Datos antiguos eliminados');

    // Inserta los nuevos datos
    const result = await petModel.insertMany(petsData);
    console.log(`${result.length} mascotas insertadas correctamente`);
  } catch (error) {
    console.error('Error al insertar datos:', error.message || error.errors);
  } finally {
    // Cierra la conexión
    mongoose.connection.close();
  }
}

seedDatabase();