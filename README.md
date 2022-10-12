# FSW 10 - Kelompok 3: SecondHand (Backend)

Repository ini ditujukan sebagai backend dari final project kelompok 3 dalam membuat e-commerce SecondHand [(lihat website di sini)](https://pa-be-k3.herokuapp.com/api/documentation/) menggunakan Express.js.  
Repository ini menggunakan MVC Pattern, yang artinya di dalam repository ini terdapat modul model, controller dan view.

## Getting Started

Untuk mulai membuat sebuah implementasi dari HTTP Server, mulailah dengan menginspeksi file [`app/index.js`](./app/index.js) dan lihatlah salah satu contoh `controller` yang ada di [`app/controllers/mainController.js`](./app/controllers/mainController.js)

Sebelum menjalankan server pastikan sudah me-rename file `.env-example` menjadi `.env` dan melakukan konfigurasi sesuai kebutuhan.

jangan lupa juga untuk menginstall seluruh dependencies menggunakan perintah `yarn install`.

Selanjutnya pastikan database dan migrasinya sudah dibuat dengan menjalankan beberapa perintah berikut secara berurutan:

```sh
yarn db:create
yarn db:migrate
yarn db:seed
```

Dan untuk menjalankan development server, kalian tinggal jalanin salah satu script di [`package.json`](./package.json#L7-8), yang namanya `develop`.

```sh
yarn develop
```

## Database Management

Di dalam repository ini sudah terdapat beberapa script yang dapat digunakan dalam memanage database, yaitu:

-   `yarn db:create` digunakan untuk membuat database
-   `yarn db:drop` digunakan untuk menghapus database
-   `yarn db:migrate` digunakan untuk menjalankan database migration
-   `yarn db:seed` digunakan untuk melakukan seeding
-   `yarn db:rollback` digunakan untuk membatalkan migrasi terakhir
