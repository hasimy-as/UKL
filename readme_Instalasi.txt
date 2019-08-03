{ Projek UKL - Inventaris Sarpra SMK Telkom Malang }

Nama: Achmad Syeh Hasimy, MD.
Kelas: X RPL 1
Absen: 02

Assalamu'alaikum,
Selamat Datang.

Di "readme" ini, ditunjukkan cara untuk menginisialisasi / menjalankan projek ini.
Berikut langkah-langkahnya:

-----------------------------------------------------------------------------------------------------

1. Silahkan install module-module yang diperlukan 
  oleh projek ini dengan npm (node package manager).

  Kode instalasi module seperti ini:
  `npm i -g --save-dev`

  (Jika terjadi error, contoh: "cannot find module 'nama_module'",
    maka dimohon untuk install module-module secara manual.
    seperti ini: 
    
    `npm i nama_module --save-dev`)

2. Setelah instalasi module, import file inventaris.sql yang ada di folder `database`, ke PHPMyAdmin.
  Caranya ialah seperti berikut:
    a. Buka PHPMyAdmin lewat `localhost/phpmyadmin` atau `127.0.0.1/phpmyadmin`.
    b. Silahkan membuat database baru dengan nama inventaris.
    c. Setelah membuat database baru, silahkan import file inventaris.sql ke database tersebut.

3. Setelah melakukan instalasi module, dan import database, 
  projek bisa dijalankan dengan menggunakan kode berikut:

  `node serverMain.js`
  atau `nodemon serverMain.js`

  Demi inisialisasi yang simple, projek bisa dijalankan dengan kode ini:
  `npm start` yang nanti akan otomatis inisialisasi serverMain.js dengan `nodemon`.

-----------------------------------------------------------------------------------------------------

Setelah melakukan langkah-langkah diatas, projek sudah bisa dijalankan.
Sekian untuk readme ini, semoga bermanfaat.

Terima kasih,
Wassalamu'alaikum.

~ A.S. Hasimy.