# Panduan Mengunggah Proyek ke GitHub

Berikut adalah langkah-langkah untuk mengunggah (push) kode proyek Anda dari lingkungan lokal ke repositori baru di GitHub.

**Prasyarat:**
*   Anda memiliki akun GitHub.
*   Git terinstal di komputer Anda.

---

### Langkah 1: Inisialisasi Repositori Git Lokal

Jika proyek Anda belum menjadi repositori Git, Anda perlu menginisialisasinya terlebih dahulu.

1.  Buka terminal atau command prompt di direktori root proyek Anda.
2.  Jalankan perintah berikut:
    ```bash
    git init -b main
    ```
    Perintah ini membuat repositori Git baru di dalam proyek Anda dengan branch utama bernama `main`.
---

### Langkah 2: Buat File `.gitignore`

Sangat penting untuk mencegah file-file yang tidak perlu (seperti `node_modules`) diunggah ke GitHub. Saya telah membuatkan file `.gitignore` untuk Anda, yang akan secara otomatis mengabaikan file dan folder tersebut.

---

### Langkah 3: Tambah dan Commit File

Selanjutnya, tambahkan semua file proyek Anda ke Git dan buat commit pertama.

1.  Tambahkan semua file ke *staging area*:
    ```bash
    git add .
    ```
2.  Buat *commit* (simpanan permanen) dari perubahan Anda dengan sebuah pesan:
    ```bash
    git commit -m "Initial commit: Proyek Binarta Luhur"
    ```

---

### Langkah 4: Buat Repositori Baru di GitHub

1.  Buka [GitHub](https://github.com) dan login.
2.  Klik ikon `+` di pojok kanan atas, lalu pilih **"New repository"**.
3.  Beri nama repositori Anda (misalnya, `website-binarta-luhur`).
4.  Anda bisa menambahkan deskripsi (opsional).
5.  Pastikan repositori diatur ke **Public** atau **Private** sesuai kebutuhan Anda.
6.  **Penting:** Jangan centang opsi "Initialize this repository with a README", ".gitignore", atau "license". Anda sudah memiliki proyeknya.
7.  Klik tombol **"Create repository"**.

---

### Langkah 5: Hubungkan Repositori Lokal ke GitHub

Setelah membuat repositori di GitHub, Anda akan melihat halaman dengan beberapa perintah. Cari bagian **"...or push an existing repository from the command line"**.

1.  Salin dan jalankan perintah untuk menambahkan *remote* (koneksi ke repositori GitHub). Perintahnya akan terlihat seperti ini (gunakan URL dari halaman GitHub Anda):
    ```bash
    git remote add origin https://github.com/NAMA_USER_ANDA/NAMA_REPOSITORI_ANDA.git
    ```
    Ganti `NAMA_USER_ANDA` dan `NAMA_REPOSITORI_ANDA` sesuai dengan milik Anda.

---

### Langkah 6: Unggah (Push) Kode Anda

Terakhir, unggah kode dari repositori lokal Anda ke GitHub.

1.  Jalankan perintah berikut untuk mengirim `commit` Anda ke branch `main` di GitHub:
    ```bash
    git push -u origin main
    ```
2.  Git mungkin akan meminta Anda untuk memasukkan username dan password (atau Personal Access Token) GitHub Anda.

Selesai! Sekarang kode proyek Anda sudah tersimpan di GitHub. Untuk pembaruan selanjutnya, Anda hanya perlu menjalankan `git add .`, `git commit -m "pesan commit"`, dan `git push`.
