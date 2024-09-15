// import * as SQLite from 'expo-sqlite';

// // Função para abrir o banco de dados de forma assíncrona
// async function initDatabase() {
//   try {
//     const database = await SQLite.openDatabaseAsync('places.db');
//     console.log('Banco de dados aberto com sucesso!');
//     return database;
//   } catch (error) {
//     console.log('Erro ao abrir banco de dados:', error);
//     return null;
//   }
// }

// // Função para inicializar o banco de dados com `withTransactionAsync`
// export async function init() {
//   const database = await initDatabase();

//   if (!database) {
//     console.log('Não foi possível inicializar o banco de dados.');
//     return;
//   }

//   try {
//     // Inicia a transação com `withTransactionAsync`
//     await database.withTransactionAsync(async (tx) => {
//       await database.execAsync(
//         `CREATE TABLE IF NOT EXISTS places (
//           id INTEGER PRIMARY KEY AUTOINCREMENT, 
//           title TEXT NOT NULL, 
//           imageUri TEXT NOT NULL, 
//           address TEXT NOT NULL, 
//           lat REAL NOT NULL, 
//           lng REAL NOT NULL
//         );`
//       );
//       console.log('Tabela places criada com sucesso');
//     });
//   } catch (error) {
//     console.log('Erro ao criar tabela places:', error);
//   }
// }

// export async function insertPlace(place) {
//   console.log('Inserindo lugar...');
//   const database = await initDatabase();

//   if (!database) {
//     console.log('Não foi possível inicializar o banco de dados.');
//     return;
//   }
//   database
//     .runAsync(
//       `INSERT INTO places (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);`,
//       [
//         place.title,
//         place.imageUri,
//         place.address,
//         place.location.lat,
//         place.location.lng,
//       ]
//     )
//     .then(() => {
//       console.log('Lugar inserido com sucesso');
//     })
//     .catch((error) => {
//       console.log('Erro ao inserir lugar:', error);
//     });
// }

// export async function fetchPlaces() {
//   const database = await initDatabase();

//   if (!database) {
//     console.log('Não foi possível inicializar o banco de dados.');
//     return;
//   }

//   try {
//     await database.withTransactionAsync(async (tx) => {
//       const rows = await database.getAllAsync(`SELECT * FROM places;`);

//       const places = rows.map((row) => ({
//         id: row.id,
//         title: row.title,
//         imageUri: row.imageUri,
//         address: row.address,
//         location: {
//           lat: row.lat,
//           lng: row.lng,
//         },
//       }));

//       //console.log('Lugares recuperados com sucesso', places);
//       return places;
//     });
//   } catch (error) {
//     console.log('Erro ao inserir lugar:', error);
//   }
// }
