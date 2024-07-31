#  SSSAPP

React express app


## Tech Stack

**Dashboard Admin:** Tailadmin

**Database:** MySQL

**ORM:** Prisma

**Authentication:** JWT

**Client:** Tailwind


## Getting Started

Buat .env file didalam folder client and server, copy nilai dari .env.example.

Pertama install:

```bash
npm install
#then
npm run build
```

Selanjutnya setting database, pastikan mysql url didalam .env server benar. Setelah .env didalam server diatur jalankan perintah ini dari root directory:

```bash
npm run build:db
```

NOTE: Jika tabel database gagal terbentuk, masuk ke folder server dan jalankan:

```bash
npx prisma db push
```

Start project dari root directory:

```bash
npm run dev
```


Buka [http://localhost:5173](http://localhost:5173/) untuk melihat hasil.

Untuk mendaftar sebagai Admin silahkan buka: [http://localhost:5173/register-admin](http://localhost:5173/register-admin)

Untuk mendaftar sebagai Ordinary User silahkan buka: [http://localhost:5173/signup](http://localhost:5173/signup) 

