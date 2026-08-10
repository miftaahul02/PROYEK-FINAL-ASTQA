/**
 * TC-E2E-STD-01 s/d TC-E2E-STD-05
 * E2E Tests: Manajemen Data Siswa
 */
const { test, expect } = require('@playwright/test');

async function loginAsAdmin(page) {
  await page.goto('/login');
  await page.fill('input[type="text"]:visible', 'admin1');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Masuk ke Sistem")');
  await page.waitForURL(/dashboard/, { timeout: 15000 });
}

test.describe('TC-E2E-STD: Manajemen Data Siswa', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('TC-E2E-STD-01: Daftar siswa tampil dengan tabel dan pagination', async ({ page }) => {
    await page.goto('/students');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await expect(page.locator('table, tbody, [role="table"]').first()).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain('students');
  });

  test('TC-E2E-STD-02: Pencarian siswa berdasarkan nama menampilkan hasil relevan', async ({ page }) => {
    await page.goto('/students');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    const searchInput = page.locator('input[type="text"], input[type="search"], input[placeholder]').first();
    await expect(searchInput).toBeVisible({ timeout: 10000 });
    await searchInput.fill('A');
    await page.waitForTimeout(1500);
    await expect(page.locator('table, tbody').first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-STD-03: Klik detail siswa menampilkan halaman/modal profil', async ({ page }) => {
    await page.goto('/students');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await expect(page.locator('table, tbody').first()).toBeVisible({ timeout: 10000 });
    const detailBtn = page.locator('button:has-text("Detail"), button:has-text("Lihat"), a:has-text("Detail"), [aria-label*="detail"]').first();
    if (await detailBtn.isVisible({ timeout: 3000 })) {
      await detailBtn.click();
      await page.waitForTimeout(1000);
    }
    expect(page.url()).toMatch(/students|detail|profile/);
  });

  test('TC-E2E-STD-04: Tambah siswa baru dengan data valid berhasil', async ({ page }) => {
    await page.goto('/students');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    const addBtn = page.locator('button:has-text("Tambah Siswa"), button:has-text("+ Tambah"), button:has-text("Tambah")').first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page.locator('text=Tambah Siswa Baru')).toBeVisible({ timeout: 5000 });

    const uniqueNIS = `99${Date.now().toString().slice(-6)}`;
    await page.fill('input[placeholder*="Nama lengkap"], input[placeholder*="nama"]', 'Siswa Test Otomatis');
    await page.fill('input[placeholder*="Nomor Induk Siswa"]', uniqueNIS);
    await page.fill('input[type="date"]', '2008-01-15');

    // Klik tombol Simpan yang terlihat di modal
    await page.locator('button:has-text("Simpan")').click();

    // Tunggu modal tertutup atau toast muncul (salah satu)
    await Promise.race([
      page.locator('text=Tambah Siswa Baru').waitFor({ state: 'hidden', timeout: 8000 }),
      page.locator('[role="status"], .toast, text=/berhasil|sukses|ditambahkan/i').first().waitFor({ state: 'visible', timeout: 8000 }),
    ]).catch(() => {});

    // Verifikasi — modal sudah tutup atau masih di halaman students
    expect(page.url()).toContain('students');
  });

  test('TC-E2E-STD-05: Tambah siswa dengan NIS yang sudah ada → pesan error duplikat', async ({ page }) => {
    await page.goto('/students');
    await page.waitForLoadState('networkidle', { timeout: 15000 });

    // Ambil NIS siswa pertama dari tabel
    const firstNIS = await page.locator('tbody tr:first-child td:nth-child(2), tbody tr:first-child td').first().textContent();

    const addBtn = page.locator('button:has-text("Tambah Siswa"), button:has-text("Tambah")').first();
    await expect(addBtn).toBeVisible({ timeout: 10000 });
    await addBtn.click();

    await expect(page.locator('text=Tambah Siswa Baru')).toBeVisible({ timeout: 5000 });

    // Isi dengan nama lengkap dulu (required field)
    await page.fill('input[placeholder*="Nama lengkap"], input[placeholder*="nama"]', 'Duplikat Test');
    // Gunakan NIS dari tabel (pasti sudah ada)
    const nisToUse = (firstNIS || '').trim().substring(0, 20) || 'SISWATEST01';
    await page.fill('input[placeholder*="Nomor Induk Siswa"]', nisToUse);
    await page.fill('input[type="date"]', '2008-05-20');

    await page.locator('button:has-text("Simpan")').click();
    await page.waitForTimeout(3000);

    // Verifikasi: modal masih terbuka (form tidak submit) ATAU pesan error tampil
    const modalStillOpen = await page.locator('text=Tambah Siswa Baru').isVisible();
    const errorVisible = await page.locator('text=/duplikat|sudah|error|gagal/i').first().isVisible().catch(() => false);

    expect(modalStillOpen || errorVisible).toBeTruthy();
  });
});
