# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: dashboard.spec.js >> TC-E2E-DASH: Dashboard & Navigasi >> TC-E2E-DASH-02: Semua item menu navigasi dapat diklik dan berpindah halaman
- Location: tests\dashboard.spec.js:29:3

# Error details

```
Test timeout of 6000ms exceeded.
```

```
Error: page.waitForLoadState: Test timeout of 6000ms exceeded.
```

# Page snapshot

```yaml
- generic [active] [ref=f4e1]:
  - generic [ref=f4e3]:
    - complementary [ref=f4e4]:
      - generic [ref=f4e9]:
        - paragraph [ref=f4e10]: SMA Cendekia
        - paragraph [ref=f4e11]: Nusantara · 2025/2026
      - generic [ref=f4e13]:
        - generic [ref=f4e14]: AD
        - generic [ref=f4e15]:
          - paragraph [ref=f4e16]: admin1
          - paragraph [ref=f4e17]: Administrator
        - generic "Online" [ref=f4e18]
      - navigation [ref=f4e19]:
        - generic [ref=f4e20]:
          - paragraph [ref=f4e21]: Utama
          - generic [ref=f4e22]:
            - link "Dashboard" [ref=f4e23] [cursor=pointer]:
              - /url: /dashboard
            - link "Manajemen User" [ref=f4e29] [cursor=pointer]:
              - /url: /users
        - generic [ref=f4e34]:
          - paragraph [ref=f4e35]: Akademik
          - generic [ref=f4e36]:
            - link "Data Siswa" [ref=f4e37] [cursor=pointer]:
              - /url: /students
            - link "Data Guru" [ref=f4e42] [cursor=pointer]:
              - /url: /teachers
            - link "Kelas" [ref=f4e47] [cursor=pointer]:
              - /url: /classes
            - link "Mata Pelajaran" [ref=f4e52] [cursor=pointer]:
              - /url: /subjects
            - link "Jadwal" [ref=f4e57] [cursor=pointer]:
              - /url: /schedules
            - link "Nilai" [ref=f4e62] [cursor=pointer]:
              - /url: /grades
            - link "Absensi" [ref=f4e67] [cursor=pointer]:
              - /url: /attendance
            - link "Jurnal Mengajar" [ref=f4e72] [cursor=pointer]:
              - /url: /journals
            - link "BK" [ref=f4e77] [cursor=pointer]:
              - /url: /bk
        - generic [ref=f4e82]:
          - paragraph [ref=f4e83]: Laporan
          - generic [ref=f4e84]:
            - link "Laporan" [ref=f4e85] [cursor=pointer]:
              - /url: /reports
            - link "Audit Log" [ref=f4e90] [cursor=pointer]:
              - /url: /activity-logs
        - generic [ref=f4e95]:
          - paragraph [ref=f4e96]: Akun
          - link "Profil & Keamanan" [ref=f4e98] [cursor=pointer]:
            - /url: /profile
      - button [ref=f4e104] [cursor=pointer]
    - generic [ref=f4e108]:
      - banner [ref=f4e109]:
        - generic [ref=f4e112]:
          - generic [ref=f4e113]: SMA Cendekia Nusantara
          - generic [ref=f4e116]: Dashboard
        - generic [ref=f4e117]:
          - generic [ref=f4e118]:
            - generic [ref=f4e119]: Sabtu, 8 Agustus 2026
            - generic [ref=f4e120]: 17.07 WIB
          - button [ref=f4e122] [cursor=pointer]
          - generic [ref=f4e126]:
            - generic [ref=f4e127]: AD
            - generic [ref=f4e128]:
              - paragraph [ref=f4e129]: admin1
              - paragraph [ref=f4e130]: Administrator
      - main [ref=f4e131]:
        - generic [ref=f4e133]:
          - generic [ref=f4e134]:
            - generic [ref=f4e135]:
              - heading "Dashboard" [level=1] [ref=f4e136]
              - paragraph [ref=f4e137]: Selamat datang, admin1
            - generic [ref=f4e138]:
              - paragraph [ref=f4e139]: Tahun Ajaran
              - paragraph [ref=f4e140]: 2025/2026
          - generic [ref=f4e141]:
            - generic [ref=f4e142]:
              - generic [ref=f4e143]: 🎓
              - generic [ref=f4e145]:
                - paragraph [ref=f4e146]: Total Siswa
                - paragraph [ref=f4e147]: "100"
                - paragraph [ref=f4e148]: 100 aktif
            - generic [ref=f4e149]:
              - generic [ref=f4e150]: 👨‍🏫
              - generic [ref=f4e152]:
                - paragraph [ref=f4e153]: Total Guru
                - paragraph [ref=f4e154]: "20"
                - paragraph [ref=f4e155]: Tenaga Pengajar
            - generic [ref=f4e156]:
              - generic [ref=f4e157]: 🏫
              - generic [ref=f4e159]:
                - paragraph [ref=f4e160]: Total Kelas
                - paragraph [ref=f4e161]: "10"
                - paragraph [ref=f4e162]: Rombongan Belajar
            - generic [ref=f4e163]:
              - generic [ref=f4e164]: 📚
              - generic [ref=f4e166]:
                - paragraph [ref=f4e167]: Mata Pelajaran
                - paragraph [ref=f4e168]: "10"
                - paragraph [ref=f4e169]: Aktif
          - generic [ref=f4e170]:
            - generic [ref=f4e171]:
              - generic [ref=f4e172]: 🤝
              - generic [ref=f4e174]:
                - paragraph [ref=f4e175]: Kasus BK Aktif
                - paragraph [ref=f4e176]: "18"
                - paragraph [ref=f4e177]: Belum selesai
            - generic [ref=f4e178]:
              - generic [ref=f4e179]: ⚠️
              - generic [ref=f4e181]:
                - paragraph [ref=f4e182]: Pelanggaran (30hr)
                - paragraph [ref=f4e183]: "0"
                - paragraph [ref=f4e184]: 30 hari terakhir
            - generic [ref=f4e185]:
              - generic [ref=f4e186]: 🏆
              - generic [ref=f4e188]:
                - paragraph [ref=f4e189]: Prestasi (30hr)
                - paragraph [ref=f4e190]: "0"
                - paragraph [ref=f4e191]: 30 hari terakhir
            - generic [ref=f4e192]:
              - generic [ref=f4e193]: 📖
              - generic [ref=f4e195]:
                - paragraph [ref=f4e196]: Jurnal Bulan Ini
                - paragraph [ref=f4e197]: "0"
                - paragraph [ref=f4e198]: Entri jurnal
          - generic [ref=f4e199]:
            - generic [ref=f4e200]:
              - heading "Siswa per Kelas" [level=3] [ref=f4e201]
              - img [ref=f4e204]:
                - generic [ref=f4e209]:
                  - generic [ref=f4e210]: X-A
                  - generic [ref=f4e212]: X-B
                  - generic [ref=f4e214]: X-C
                  - generic [ref=f4e216]: XI-A
                  - generic [ref=f4e218]: XI-B
                  - generic [ref=f4e220]: XI-C
                  - generic [ref=f4e222]: XII-A
                  - generic [ref=f4e224]: XII-B
                  - generic [ref=f4e226]: XII-C
                  - generic [ref=f4e228]: XII-D
                - generic [ref=f4e231]:
                  - generic [ref=f4e232]: "0"
                  - generic [ref=f4e234]: "3"
                  - generic [ref=f4e236]: "6"
                  - generic [ref=f4e238]: "9"
                  - generic [ref=f4e240]: "12"
            - generic [ref=f4e264]:
              - heading "Kehadiran Bulan Ini" [level=3] [ref=f4e265]
              - generic [ref=f4e274]:
                - generic [ref=f4e275]: "Hadir: 7"
                - generic [ref=f4e278]: "Sakit: 3"
                - generic [ref=f4e281]: "Izin: 0"
                - generic [ref=f4e284]: "Alpha: 0"
          - generic [ref=f4e287]:
            - heading "Aktivitas Terbaru" [level=3] [ref=f4e288]
            - generic [ref=f4e289]:
              - generic [ref=f4e290]:
                - generic [ref=f4e291]: A
                - generic [ref=f4e292]:
                  - paragraph [ref=f4e293]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e294]: 8/8/2026, 17.07.18
                - generic [ref=f4e295]: auth
              - generic [ref=f4e296]:
                - generic [ref=f4e297]: A
                - generic [ref=f4e298]:
                  - paragraph [ref=f4e299]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e300]: 8/8/2026, 16.36.19
                - generic [ref=f4e301]: auth
              - generic [ref=f4e302]:
                - generic [ref=f4e303]: A
                - generic [ref=f4e304]:
                  - paragraph [ref=f4e305]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e306]: 8/8/2026, 16.18.23
                - generic [ref=f4e307]: auth
              - generic [ref=f4e308]:
                - generic [ref=f4e309]: A
                - generic [ref=f4e310]:
                  - paragraph [ref=f4e311]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e312]: 8/8/2026, 15.10.35
                - generic [ref=f4e313]: auth
              - generic [ref=f4e314]:
                - generic [ref=f4e315]: A
                - generic [ref=f4e316]:
                  - paragraph [ref=f4e317]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e318]: 8/8/2026, 15.07.39
                - generic [ref=f4e319]: auth
              - generic [ref=f4e320]:
                - generic [ref=f4e321]: A
                - generic [ref=f4e322]:
                  - paragraph [ref=f4e323]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e324]: 8/8/2026, 15.00.49
                - generic [ref=f4e325]: auth
              - generic [ref=f4e326]:
                - generic [ref=f4e327]: S
                - generic [ref=f4e328]:
                  - paragraph [ref=f4e329]: siswa1·POST /api/auth/logout
                  - paragraph [ref=f4e330]: 8/8/2026, 14.55.09
                - generic [ref=f4e331]: auth
              - generic [ref=f4e332]:
                - generic [ref=f4e333]: G
                - generic [ref=f4e334]:
                  - paragraph [ref=f4e335]: guru2·POST /api/auth/logout
                  - paragraph [ref=f4e336]: 8/8/2026, 14.54.53
                - generic [ref=f4e337]: auth
              - generic [ref=f4e338]:
                - generic [ref=f4e339]: K
                - generic [ref=f4e340]:
                  - paragraph [ref=f4e341]: kepsek·POST /api/auth/logout
                  - paragraph [ref=f4e342]: 8/8/2026, 14.54.38
                - generic [ref=f4e343]: auth
              - generic [ref=f4e344]:
                - generic [ref=f4e345]: A
                - generic [ref=f4e346]:
                  - paragraph [ref=f4e347]: admin1·POST /api/auth/logout
                  - paragraph [ref=f4e348]: 8/8/2026, 14.53.56
                - generic [ref=f4e349]: auth
      - contentinfo [ref=f4e350]:
        - generic [ref=f4e351]: © 2025 SMA Cendekia Nusantara · Sistem Informasi Sekolah v1.0
        - generic [ref=f4e352]: Scalable System Design · Powered by Node.js + React
  - generic [ref=f4e353]: "0"
```

# Test source

```ts
  1  | /**
  2  |  * TC-E2E-DASH-01 s/d TC-E2E-DASH-03
  3  |  * E2E Tests: Dashboard & Navigasi Utama
  4  |  */
  5  | const { test, expect } = require('@playwright/test');
  6  | 
  7  | async function loginAsAdmin(page) {
  8  |   await page.goto('/login');
  9  |   await page.fill('input[type="text"]:visible', 'admin1');
  10 |   await page.fill('input[type="password"]', 'password123');
  11 |   await page.click('button:has-text("Masuk ke Sistem")');
  12 |   await page.waitForURL(/dashboard/, { timeout: 15000 });
  13 | }
  14 | 
  15 | test.describe('TC-E2E-DASH: Dashboard & Navigasi', () => {
  16 | 
  17 |   test.beforeEach(async ({ page }) => {
  18 |     await loginAsAdmin(page);
  19 |   });
  20 | 
  21 |   test('TC-E2E-DASH-01: Dashboard menampilkan statistik jumlah siswa, guru, dan absensi', async ({ page }) => {
  22 |     await page.goto('/dashboard');
  23 |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  24 |     await expect(page.locator('.card, [class*="stat"], [class*="card"]').first()).toBeVisible({ timeout: 8000 });
  25 |     const statsText = page.locator('text=/siswa|guru|absensi|hadir/i');
  26 |     await expect(statsText.first()).toBeVisible({ timeout: 5000 });
  27 |   });
  28 | 
  29 |   test('TC-E2E-DASH-02: Semua item menu navigasi dapat diklik dan berpindah halaman', async ({ page }) => {
  30 |     await page.goto('/dashboard');
  31 |     const menuItems = [
  32 |       { text: /siswa/i, expectedUrl: /student/ },
  33 |       { text: /guru/i, expectedUrl: /teacher/ },
  34 |       { text: /absensi/i, expectedUrl: /attendance/ },
  35 |     ];
  36 |     for (const menu of menuItems) {
  37 |       const menuLink = page.locator('nav a, aside a, [role="navigation"] a').filter({ hasText: menu.text }).first();
  38 |       if (await menuLink.isVisible({ timeout: 2000 })) {
  39 |         await menuLink.click();
  40 |         await page.waitForTimeout(500);
  41 |         expect(page.url()).toMatch(menu.expectedUrl);
  42 |         await page.goto('/dashboard');
> 43 |         await page.waitForLoadState('networkidle', { timeout: 10000 });
     |                    ^ Error: page.waitForLoadState: Test timeout of 6000ms exceeded.
  44 |       }
  45 |     }
  46 |   });
  47 | 
  48 |   test('TC-E2E-DASH-03: Halaman dashboard responsif di viewport mobile (375x667)', async ({ page }) => {
  49 |     await page.setViewportSize({ width: 375, height: 667 });
  50 |     await page.goto('/dashboard');
  51 |     await page.waitForLoadState('networkidle', { timeout: 15000 });
  52 |     await expect(page.locator('main, [role="main"], #root, body').first()).toBeVisible({ timeout: 5000 });
  53 |     expect(page.url()).toContain('dashboard');
  54 |   });
  55 | });
  56 | 
```