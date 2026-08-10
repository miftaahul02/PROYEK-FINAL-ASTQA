# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: students.spec.js >> TC-E2E-STD: Manajemen Data Siswa >> TC-E2E-STD-05: Tambah siswa dengan NIS yang sudah ada → pesan error duplikat
- Location: tests\students.spec.js:78:3

# Error details

```
Test timeout of 6000ms exceeded.
```

```
Error: page.waitForTimeout: Test timeout of 6000ms exceeded.
```

# Page snapshot

```yaml
- generic [ref=f1e2]:
  - generic [ref=f1e3]:
    - complementary [ref=f1e4]:
      - generic [ref=f1e9]:
        - paragraph [ref=f1e10]: SMA Cendekia
        - paragraph [ref=f1e11]: Nusantara · 2025/2026
      - generic [ref=f1e13]:
        - generic [ref=f1e14]: AD
        - generic [ref=f1e15]:
          - paragraph [ref=f1e16]: admin1
          - paragraph [ref=f1e17]: Administrator
        - generic "Online" [ref=f1e18]
      - navigation [ref=f1e19]:
        - generic [ref=f1e20]:
          - paragraph [ref=f1e21]: Utama
          - generic [ref=f1e22]:
            - link "Dashboard" [ref=f1e23] [cursor=pointer]:
              - /url: /dashboard
            - link "Manajemen User" [ref=f1e28] [cursor=pointer]:
              - /url: /users
        - generic [ref=f1e33]:
          - paragraph [ref=f1e34]: Akademik
          - generic [ref=f1e35]:
            - link "Data Siswa" [ref=f1e36] [cursor=pointer]:
              - /url: /students
            - link "Data Guru" [ref=f1e42] [cursor=pointer]:
              - /url: /teachers
            - link "Kelas" [ref=f1e47] [cursor=pointer]:
              - /url: /classes
            - link "Mata Pelajaran" [ref=f1e52] [cursor=pointer]:
              - /url: /subjects
            - link "Jadwal" [ref=f1e57] [cursor=pointer]:
              - /url: /schedules
            - link "Nilai" [ref=f1e62] [cursor=pointer]:
              - /url: /grades
            - link "Absensi" [ref=f1e67] [cursor=pointer]:
              - /url: /attendance
            - link "Jurnal Mengajar" [ref=f1e72] [cursor=pointer]:
              - /url: /journals
            - link "BK" [ref=f1e77] [cursor=pointer]:
              - /url: /bk
        - generic [ref=f1e82]:
          - paragraph [ref=f1e83]: Laporan
          - generic [ref=f1e84]:
            - link "Laporan" [ref=f1e85] [cursor=pointer]:
              - /url: /reports
            - link "Audit Log" [ref=f1e90] [cursor=pointer]:
              - /url: /activity-logs
        - generic [ref=f1e95]:
          - paragraph [ref=f1e96]: Akun
          - link "Profil & Keamanan" [ref=f1e98] [cursor=pointer]:
            - /url: /profile
      - button [ref=f1e104] [cursor=pointer]
    - generic [ref=f1e108]:
      - banner [ref=f1e109]:
        - generic [ref=f1e112]:
          - generic [ref=f1e113]: SMA Cendekia Nusantara
          - generic [ref=f1e116]: Data Siswa
        - generic [ref=f1e117]:
          - generic [ref=f1e118]:
            - generic [ref=f1e119]: Sabtu, 8 Agustus 2026
            - generic [ref=f1e120]: 17.08 WIB
          - button [ref=f1e122] [cursor=pointer]
          - generic [ref=f1e126]:
            - generic [ref=f1e127]: AD
            - generic [ref=f1e128]:
              - paragraph [ref=f1e129]: admin1
              - paragraph [ref=f1e130]: Administrator
      - main [ref=f1e131]:
        - generic [ref=f1e133]:
          - generic [ref=f1e134]:
            - generic [ref=f1e135]:
              - heading "Data Siswa" [level=1] [ref=f1e136]
              - paragraph [ref=f1e137]: "Total: 0 siswa terdaftar"
            - generic [ref=f1e138]:
              - generic [ref=f1e139] [cursor=pointer]: Import Excel
              - button "Export Excel" [ref=f1e140] [cursor=pointer]
              - button "+ Tambah Siswa" [ref=f1e141] [cursor=pointer]:
                - generic [ref=f1e142]: +
                - text: Tambah Siswa
          - textbox "Cari nama, NIS, NISN..." [ref=f1e145]: Duplikat Test
          - table [ref=f1e148]:
            - rowgroup [ref=f1e149]:
              - row [ref=f1e150]:
                - columnheader "No" [ref=f1e151]
                - columnheader "NIS" [ref=f1e152]
                - columnheader "Nama Lengkap" [ref=f1e153]
                - columnheader "Kelas" [ref=f1e154]
                - columnheader "JK" [ref=f1e155]
                - columnheader "Status" [ref=f1e156]
                - columnheader "Aksi" [ref=f1e157]
            - rowgroup [ref=f1e158]:
              - row [ref=f1e159]:
                - cell [ref=f1e160]:
                  - generic [ref=f1e165]:
                    - paragraph [ref=f1e166]: Tidak ada data ditemukan
                    - paragraph [ref=f1e167]: Belum ada data untuk ditampilkan
          - generic [ref=f1e171]:
            - generic [ref=f1e172]:
              - heading "Tambah Siswa Baru" [level=3] [ref=f1e173]
              - button [ref=f1e174] [cursor=pointer]
            - generic [ref=f1e177]:
              - generic [ref=f1e178]:
                - generic [ref=f1e179]:
                  - generic [ref=f1e180]: Nama Lengkap *
                  - textbox "Nama lengkap siswa" [ref=f1e181]
                - generic [ref=f1e182]:
                  - generic [ref=f1e183]: NIS *
                  - textbox "Nomor Induk Siswa" [ref=f1e184]: "1"
                - generic [ref=f1e185]:
                  - generic [ref=f1e186]: NISN
                  - textbox "Nomor Induk Siswa Nasional" [ref=f1e187]
                - generic [ref=f1e188]:
                  - generic [ref=f1e189]: Jenis Kelamin
                  - combobox [ref=f1e190] [cursor=pointer]:
                    - option "Laki-laki" [selected]
                    - option "Perempuan"
                - generic [ref=f1e191]:
                  - generic [ref=f1e192]: Agama
                  - combobox [ref=f1e193] [cursor=pointer]:
                    - option "Islam" [selected]
                    - option "Kristen"
                    - option "Katolik"
                    - option "Hindu"
                    - option "Buddha"
                    - option "Konghucu"
                - generic [ref=f1e194]:
                  - generic [ref=f1e195]: Tempat Lahir
                  - textbox [ref=f1e196]
                - generic [ref=f1e197]:
                  - generic [ref=f1e198]: Tanggal Lahir
                  - textbox [ref=f1e199]: 2008-05-20
                - generic [ref=f1e200]:
                  - generic [ref=f1e201]: Kelas
                  - combobox [ref=f1e202] [cursor=pointer]:
                    - option "-- Pilih Kelas --" [selected]
                    - option "X-A"
                    - option "X-B"
                    - option "X-C"
                    - option "XI-A"
                    - option "XI-B"
                    - option "XI-C"
                    - option "XII-A"
                    - option "XII-B"
                    - option "XII-C"
                    - option "XII-D"
                - generic [ref=f1e203]:
                  - generic [ref=f1e204]: Tahun Masuk
                  - spinbutton [ref=f1e205]: "2025"
                - generic [ref=f1e206]:
                  - generic [ref=f1e207]: Telepon
                  - textbox [ref=f1e208]
                - generic [ref=f1e209]:
                  - generic [ref=f1e210]: Email (untuk login)
                  - textbox [ref=f1e211]
                - generic [ref=f1e212]:
                  - generic [ref=f1e213]: Alamat
                  - textbox [ref=f1e214]
              - generic [ref=f1e215]:
                - button "Batal" [ref=f1e216] [cursor=pointer]
                - button "Simpan" [active] [ref=f1e217] [cursor=pointer]
      - contentinfo [ref=f1e218]:
        - generic [ref=f1e219]: © 2025 SMA Cendekia Nusantara · Sistem Informasi Sekolah v1.0
        - generic [ref=f1e220]: Scalable System Design · Powered by Node.js + React
  - status [ref=f1e226]: Nama dan NIS wajib diisi
```

# Test source

```ts
  1   | /**
  2   |  * TC-E2E-STD-01 s/d TC-E2E-STD-05
  3   |  * E2E Tests: Manajemen Data Siswa
  4   |  */
  5   | const { test, expect } = require('@playwright/test');
  6   | 
  7   | async function loginAsAdmin(page) {
  8   |   await page.goto('/login');
  9   |   await page.fill('input[type="text"]:visible', 'admin1');
  10  |   await page.fill('input[type="password"]', 'password123');
  11  |   await page.click('button:has-text("Masuk ke Sistem")');
  12  |   await page.waitForURL(/dashboard/, { timeout: 15000 });
  13  | }
  14  | 
  15  | test.describe('TC-E2E-STD: Manajemen Data Siswa', () => {
  16  | 
  17  |   test.beforeEach(async ({ page }) => {
  18  |     await loginAsAdmin(page);
  19  |   });
  20  | 
  21  |   test('TC-E2E-STD-01: Daftar siswa tampil dengan tabel dan pagination', async ({ page }) => {
  22  |     await page.goto('/students');
  23  |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  24  |     await expect(page.locator('table, tbody, [role="table"]').first()).toBeVisible({ timeout: 10000 });
  25  |     expect(page.url()).toContain('students');
  26  |   });
  27  | 
  28  |   test('TC-E2E-STD-02: Pencarian siswa berdasarkan nama menampilkan hasil relevan', async ({ page }) => {
  29  |     await page.goto('/students');
  30  |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  31  |     const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder]').first();
  32  |     await expect(searchInput).toBeVisible({ timeout: 10000 });
  33  |     await searchInput.fill('A');
  34  |     await page.waitForTimeout(1500);
  35  |     await expect(page.locator('table, tbody').first()).toBeVisible({ timeout: 5000 });
  36  |   });
  37  | 
  38  |   test('TC-E2E-STD-03: Klik detail siswa menampilkan halaman/modal profil', async ({ page }) => {
  39  |     await page.goto('/students');
  40  |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  41  |     await expect(page.locator('table, tbody').first()).toBeVisible({ timeout: 10000 });
  42  |     const detailBtn = page.locator('button:has-text("Detail"), button:has-text("Lihat"), a:has-text("Detail"), [aria-label*="detail"]').first();
  43  |     if (await detailBtn.isVisible({ timeout: 3000 })) {
  44  |       await detailBtn.click();
  45  |       await page.waitForTimeout(1000);
  46  |     }
  47  |     expect(page.url()).toMatch(/students|detail|profile/);
  48  |   });
  49  | 
  50  |   test('TC-E2E-STD-04: Tambah siswa baru dengan data valid berhasil', async ({ page }) => {
  51  |     await page.goto('/students');
  52  |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  53  | 
  54  |     const addBtn = page.locator('button:has-text("Tambah Siswa"), button:has-text("+ Tambah"), button:has-text("Tambah")').first();
  55  |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  56  |     await addBtn.click();
  57  | 
  58  |     await expect(page.locator('text=Tambah Siswa Baru')).toBeVisible({ timeout: 5000 });
  59  | 
  60  |     const uniqueNIS = `99${Date.now().toString().slice(-6)}`;
  61  |     await page.fill('input[placeholder*="Nama lengkap"], input[placeholder*="nama"]', 'Siswa Test Otomatis');
  62  |     await page.fill('input[placeholder*="Nomor Induk Siswa"]', uniqueNIS);
  63  |     await page.fill('input[type="date"]', '2008-01-15');
  64  | 
  65  |     // Klik tombol Simpan yang terlihat di modal
  66  |     await page.locator('button:has-text("Simpan")').click();
  67  | 
  68  |     // Tunggu modal tertutup atau toast muncul (salah satu)
  69  |     await Promise.race([
  70  |       page.locator('text=Tambah Siswa Baru').waitFor({ state: 'hidden', timeout: 8000 }),
  71  |       page.locator('[role="status"], .toast, text=/berhasil|sukses|ditambahkan/i').first().waitFor({ state: 'visible', timeout: 8000 }),
  72  |     ]).catch(() => {});
  73  | 
  74  |     // Verifikasi — modal sudah tutup atau masih di halaman students
  75  |     expect(page.url()).toContain('students');
  76  |   });
  77  | 
  78  |   test('TC-E2E-STD-05: Tambah siswa dengan NIS yang sudah ada → pesan error duplikat', async ({ page }) => {
  79  |     await page.goto('/students');
  80  |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  81  | 
  82  |     // Ambil NIS siswa pertama dari tabel
  83  |     const firstNIS = await page.locator('tbody tr:first-child td:nth-child(2), tbody tr:first-child td').first().textContent();
  84  | 
  85  |     const addBtn = page.locator('button:has-text("Tambah Siswa"), button:has-text("Tambah")').first();
  86  |     await expect(addBtn).toBeVisible({ timeout: 10000 });
  87  |     await addBtn.click();
  88  | 
  89  |     await expect(page.locator('text=Tambah Siswa Baru')).toBeVisible({ timeout: 5000 });
  90  | 
  91  |     // Isi dengan nama lengkap dulu (required field)
  92  |     await page.fill('input[placeholder*="Nama lengkap"], input[placeholder*="nama"]', 'Duplikat Test');
  93  |     // Gunakan NIS dari tabel (pasti sudah ada)
  94  |     const nisToUse = (firstNIS || '').trim().substring(0, 20) || 'SISWATEST01';
  95  |     await page.fill('input[placeholder*="Nomor Induk Siswa"]', nisToUse);
  96  |     await page.fill('input[type="date"]', '2008-05-20');
  97  | 
  98  |     await page.locator('button:has-text("Simpan")').click();
> 99  |     await page.waitForTimeout(3000);
      |                ^ Error: page.waitForTimeout: Test timeout of 6000ms exceeded.
  100 | 
  101 |     // Verifikasi: modal masih terbuka (form tidak submit) ATAU pesan error tampil
  102 |     const modalStillOpen = await page.locator('text=Tambah Siswa Baru').isVisible();
  103 |     const errorVisible = await page.locator('text=/duplikat|sudah|error|gagal/i').first().isVisible().catch(() => false);
  104 | 
  105 |     expect(modalStillOpen || errorVisible).toBeTruthy();
  106 |   });
  107 | });
  108 | 
```