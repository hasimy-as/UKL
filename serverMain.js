//deklarasi variabel dan port
const session = require('express-session');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./mysql');
const path = require('path');
const app = express();
const port = 1234;

//pengaturan
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

//panggil web user dan admin\\
app.get('/', function(req, res) {
  res.render('welcome');
});

app.get('/login', function(req, res) {
  res.render('login');
});

app.get('/tim', function(req, res) {
  res.render('tim');
});

app.get('/loginadmin', function(req, res) {
  res.render('admin/adminlogin');
});

/////////////////////////////////////////////////////////
/////////////////////// USER ////////////////////////////
/////////////////////////////////////////////////////////

app.post('/auth', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;
  const sql =
    'SELECT * FROM peminjam WHERE email_peminjam = ? AND password_peminjam = ?';
  if (email && password) {
    db.query(sql, [email, password], function(err, rows) {
      if (err) {
        throw (err, console.log(err));
      }
      if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.loggedout = false;
        req.session.email = email;
        res.redirect('/home');
      } else {
        res.json({
          message: 'Enter right data please...',
          code: 400,
          err: 'incorrect credentials'
        });
      }
      res.end();
    });
  }
});

app.get('/home', function(req, res) {
  var { nama_peminjam } = req.params;
  var { barangs } = req.params;
  const sql = 'SELECT * FROM peminjam ORDER BY id_peminjam LIMIT 1';
  const sql2 = 'SELECT * FROM barang';

  db.query(sql, [nama_peminjam], function(err, rows) {
    nama_peminjam = req.session;

    if (err) {
      throw (err, console.log(err));
    }

    if (rows.length > 0) {
      nama_peminjam = rows[0];
    } else {
      nama_peminjam = null;
    }

    db.query(sql2, [barangs], function(err, rows) {
      barangs = req.session;

      if (err) {
        throw (err, console.log(err));
      }

      if (rows.length > 0) {
        barangs = rows[0];
      } else {
        barangs = null;
      }
      res.render('homepage', {
        peminjam: nama_peminjam,
        barang: barangs,
        content: 'peminjam'
      });
    });
  });
});

var obj_barang = {};
app.get('/inventaris', function(req, res) {
  const sql = 'SELECT * FROM barang';
  db.query(sql, function(err, rows) {
    if (err) {
      throw (err, console.log(err));
    } else {
      obj_barang = { barang: rows };
      res.render('inventaris', obj_barang);
    }
  });
});

var barang_obj_show = {};
app.get('/pinjam', function(req, res) {
  const sqls = 'SELECT * FROM barang';
  db.query(sqls, function(err, rows) {
    if (err) {
      throw (err, console.log(err));
    } else {
      barang_obj_show = { muncul: rows };
      res.render('mau_pinjam', barang_obj_show);
    }
  });
});

var peminjam = {};
app.get('/pinjam', function(req, res) {
  const sqls = 'SELECT * FROM peminjam';
  db.query(sqls, function(err, rows) {
    if (err) {
      throw (err, console.log(err));
    } else {
      peminjam = { pinjam: rows };
      res.render('mau_pinjam', peminjam);
    }
  });
});

app.post('/auth_pinjam', function(req, res) {
  var datas = {
    nama_peminjam: req.body.nama_peminjam,
    kls_peminjam: req.body.kls_peminjam,
    nama_barang: req.body.nama_barang,
    // jmlh_dipinjam: req.body.jmlh_dipinjam,
    wkt_pinjam: req.body.wkt_pinjam,
    wkt_kembali: req.body.wkt_kembali,
    alasan: req.body.alasan,
    verifikasi: req.body.verifikasi
  };

  const insert_pinjam = `INSERT INTO user_pinjam SET ?`;
  // const update_pinjam = `UPDATE barang SET sediaBerapa_barang -= jmlh_dipinjam AND pinjamBerapa_barang += jmlh_dipinjam WHERE nama_barang = ?`;
  db.query(insert_pinjam, datas, function(err, results, fields) {
    if (!err) {
      console.log('Data peminjaman masuk: ', results);
      res.redirect('/landingpage');
    } else if (err) {
      console.log('Ada error, yurod', err);
      res.json({
        status: false,
        code: 400,
        failed: 'Ada error, yurod'
      });
    }
  });

  // db.query(update_pinjam, datas, function(err, results, fields) {
  //   if (!err) {
  //     console.log("Data pengubahan masuk: ", results);
  //     res.redirect("/landingpage");
  //   } else if (err) {
  //     console.log("Ada error, yurod", err);
  //     res.json({
  //       status: false,
  //       code: 400,
  //       failed: "Ada error, yurod"
  //     });
  //   }
  // });
});

var riwayat = {};
app.get('/riwayat', function(req, res) {
  const sql = 'SELECT * FROM user_pinjam';
  db.query(sql, function(err, rows) {
    if (err) {
      throw (err, console.log(err));
    } else {
      riwayat = { rewayad: rows };
      res.render('riwayat', riwayat);
    }
  });
});

app.get('/landingpage', function(req, res) {
  var { text } = req.params;
  const sqls = 'SELECT * FROM peminjam';

  db.query(sqls, [text], function(err, rows) {
    text = req.session;

    if (err) {
      throw (err, console.log(err));
    }

    if (rows.length > 0) {
      text = rows[0];
    } else {
      text = null;
    }

    res.render('terimakasih', {
      show: text,
      content: 'terimakasih'
    });
  });
});

/////////////////////////////////////////////////////////
/////////////////////// ADMIN ///////////////////////////
/////////////////////////////////////////////////////////

app.post('/authadmin', function(req, res) {
  var emailadmin = req.body.emailadmin;
  var passadmin = req.body.passadmin;
  const sql_admin =
    'SELECT * FROM admin WHERE emailadmin = ? AND passadmin = ?';
  if (emailadmin && passadmin) {
    db.query(sql_admin, [emailadmin, passadmin], function(err, rows) {
      if (err) {
        throw (err, console.log(err));
      }
      if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.emailadmin = emailadmin;
        res.redirect('/homeadmin');
      } else {
        res.json({
          message: 'Admin, please enter right credentials...',
          code: 400,
          err: 'incorrect credentials'
        });
      }
      res.end();
    });
  }
});

app.get('/homeadmin', function(req, res) {
  var { nama_admin } = req.params;
  var { nama_pinjam } = req.params;
  const sql_getAdmin = 'SELECT * FROM admin ORDER BY id_admin LIMIT 1';
  const sql_getPeminjam =
    'SELECT * FROM user_pinjam ORDER BY id_peminjam DESC LIMIT 1';

  db.query(sql_getAdmin, [nama_admin], function(err, rows) {
    nama_admin = req.session;

    if (err) {
      throw (err, console.log(err));
    }

    if (rows.length > 0) {
      nama_admin = rows[0];
    } else {
      nama_admin = null;
    }

    db.query(sql_getPeminjam, [nama_pinjam], function(err, rows) {
      nama_pinjam = req.session;

      if (err) {
        throw (err, console.log(err));
      }

      if (rows.length > 0) {
        nama_pinjam = rows[0];
      } else {
        nama_pinjam = null;
      }

      res.render('admin/adminhome', {
        admin: nama_admin,
        peminjam: nama_pinjam,
        content: 'admin/adminpeminjam'
      });
    });
  });
});

var object = {};
app.get('/peminjamadmin', function(req, res) {
  const sqls = 'SELECT * from user_pinjam';
  db.query(sqls, function(err, rows) {
    if (err) {
      throw (err, console.log(err));
    } else {
      object = { print: rows };
      res.render('admin/adminshow', object);
    }
  });
});

app.get('/tolak/:id_peminjam', (req, res) => {
  const { id_peminjam } = req.params;
  const update = `UPDATE user_pinjam SET verifikasi = 'Tertolak' WHERE id_peminjam = ?`;

  db.query(update, [id_peminjam], (err, rows) => {
    if (err) {
      throw (err, console.log(err));
    }
    console.log('Rows tertolak:', rows.affectedRows);
    res.redirect('/peminjamadmin');
  });
});

app.get('/terima/:id_peminjam', (req, res) => {
  const { id_peminjam } = req.params;
  const update = `UPDATE user_pinjam SET verifikasi = 'Terverifikasi' WHERE id_peminjam = ?`;

  if (obj_barang === 'Belum' || 'Tertolak') {
    db.query(update, [id_peminjam], (err, rows) => {
      if (err) {
        throw (err, console.log(err));
      }
      console.log('Rows terterima:', rows.affectedRows);
      res.redirect('/peminjamadmin');
    });
  } else if (obj_barang === 'Terverifikasi') {
    res.redirect('/maaf');
  }
});

var obj_barang = {};
app.get('/inven-admin', function(req, res) {
  const sql = 'SELECT * FROM barang';
  db.query(sql, function(err, rows) {
    if (err) {
      throw (err, console.log(err));
    } else {
      obj_barang = { barang: rows };
      res.render('admin/admininventaris', obj_barang);
    }
  });
});

app.get('/plusbarang-admin', function(req, res) {
  res.render('admin/admintambahbarang');
});

app.post('/auth_barang', function(req, res) {
  var data = {
    nama_barang: req.body.nama_barang,
    jumlah_barang: req.body.jumlah_barang,
    sediaBerapa_barang: req.body.sediaBerapa_barang,
    status_barang: req.body.status_barang
  };

  const insert_barang = `INSERT INTO barang SET ?`;
  db.query(insert_barang, data, function(err, results, fields) {
    if (!err) {
      console.log('Barang telah ditambahkan: ', results);
      res.redirect('/inven-admin');
    } else if (err) {
      console.log('Error terdeteksi:', err);
      res.json({
        status: false,
        code: 400,
        failed: 'Error terdeteksi'
      });
    }
  });
});

app.get('/maaf', function(req, res) {
  res.render('admin/maaf');
});

//deklarasi port server
app.listen(port, function() {
  console.log('\n' + `Server di localhost:${port},`);
});
