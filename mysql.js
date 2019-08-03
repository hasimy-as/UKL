//deklarasi
const mysql = require('mysql');

//koneksi database
db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'inventaris',
  multipleStatements: true,
  debug: false
});

//lapor koneksi database
db.connect(function(err) {
  if (err) {
    throw (err, console.log(err));
  } else if (!err) {
    console.log('Koneksi sukses!');
  }
});

module.exports = db;
