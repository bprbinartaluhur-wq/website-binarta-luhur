# Panduan Deployment Aplikasi Next.js ke Hosting

Berikut adalah langkah-langkah umum untuk melakukan deployment aplikasi Next.js Anda (seperti yang dibuat di Firebase Studio) ke penyedia hosting yang mendukung Node.js, seperti Hostinger.

**Penting:** Proses ini memerlukan akses ke terminal atau SSH di server hosting Anda dan pemahaman dasar tentang cara mengelola server Node.js.

---

### Langkah 1: Build Aplikasi Secara Lokal

Sebelum mengunggah aplikasi Anda, Anda perlu membuat versi produksi (production build) dari aplikasi tersebut.

1.  Buka terminal di direktori root proyek Anda.
2.  Jalankan perintah berikut:

    ```bash
    npm run build
    ```

3.  Perintah ini akan membuat folder `.next` di direktori proyek Anda. Folder ini berisi semua kode yang dioptimalkan dan siap untuk dijalankan di server.

---

### Langkah 2: Persiapkan File untuk Diunggah

Anda tidak perlu mengunggah semua file proyek Anda. File-file penting yang perlu diunggah ke server hosting Anda adalah:

-   **Folder `.next`**: Hasil dari proses build.
-   **Folder `public`**: Berisi semua aset statis seperti gambar dan font.
-   **File `package.json`**: Diperlukan untuk menginstal dependensi di server.
-   **File `package-lock.json`**: Memastikan versi dependensi yang sama terinstal di server.
-   **File `next.config.ts` (atau `.js`)**: File konfigurasi Next.js Anda.

---

### Langkah 3: Konfigurasi di Hostinger (atau Penyedia Lain)

Meskipun langkah-langkah spesifik dapat bervariasi, proses umumnya adalah sebagai berikut:

1.  **Login ke Panel Hosting Anda:** Masuk ke hPanel Hostinger atau panel kontrol hosting lainnya.
2.  **Akses File Manager:** Temukan dan buka File Manager.
3.  **Unggah File:** Unggah file dan folder yang telah Anda siapkan pada Langkah 2 ke direktori root domain Anda (misalnya, `public_html` atau direktori spesifik untuk aplikasi Node.js Anda). Cara paling efisien adalah dengan membuat file `.zip` dari file-file tersebut, mengunggahnya, lalu mengekstraknya di server.
4.  **Siapkan Aplikasi Node.js:** Di panel kontrol Hostinger, cari menu untuk "Setup Node.js App".
    -   Buat aplikasi baru.
    -   Pilih versi Node.js yang sesuai (misalnya, 18.x atau 20.x).
    -   Atur **"Application startup file"** ke `server.js` (Meskipun Next.js tidak memiliki file ini secara default, beberapa hoster memerlukannya. Jika demikian, Anda mungkin perlu membuat file `server.js` sederhana. Namun, biasanya Anda bisa mengatur perintah start).
    -   Di bagian `npm install`, jalankan perintah `npm install`.

---

### Langkah 4: Atur Environment Variables (Sangat Penting!)

Aplikasi Anda memerlukan kunci konfigurasi Firebase untuk terhubung ke database dan layanan lainnya. **Jangan pernah menulis kunci ini langsung di dalam kode yang diunggah.** Gunakan *environment variables* yang disediakan oleh panel hosting Anda.

1.  Di panel kontrol Hostinger, temukan bagian untuk mengelola **Environment Variables** untuk aplikasi Node.js Anda.
2.  Tambahkan variabel berikut, dengan nilai yang sesuai dari file `src/lib/firebase.ts` Anda:

    ```
    NEXT_PUBLIC_FIREBASE_PROJECT_ID="binarta-luhur"
    NEXT_PUBLIC_FIREBASE_APP_ID="1:889537582130:web:4a8e3304b4d8aad676d82b"
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="binarta-luhur.firebasestorage.app"
    NEXT_PUBLIC_FIREBASE_API_KEY="AIzaSyBZKSe0UgfUDHZhCwTPcp2c9h-50wazoQs"
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="binarta-luhur.firebaseapp.com"
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="889537582130"
    ```

3.  **Penting:** Anda perlu memodifikasi kode Anda (`src/lib/firebase.ts`) untuk membaca variabel-variabel ini dari `process.env` daripada menuliskannya secara langsung.

    **Contoh Modifikasi `src/lib/firebase.ts`:**
    ```typescript
    // src/lib/firebase.ts

    const firebaseConfig = {
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    };
    ```
    *Saya telah membuat perubahan ini untuk Anda.*

---

### Langkah 5: Atur Perintah Start & Jalankan Aplikasi

1.  Di panel aplikasi Node.js Anda, pastikan perintah untuk menjalankan aplikasi sudah benar. Perintah `start` di `package.json` Anda adalah `next start`.
2.  Anda mungkin perlu mengatur **"Application startup file"** atau perintah start kustom di panel hosting Anda agar sesuai dengan `npm start`.
3.  Simpan perubahan dan **Restart** aplikasi Node.js Anda dari panel kontrol.

Setelah me-restart, aplikasi Anda seharusnya sudah berjalan di domain Anda. Periksa log aplikasi di panel hosting jika terjadi kesalahan.
