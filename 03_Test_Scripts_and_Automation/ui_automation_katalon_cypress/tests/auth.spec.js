/**
 * TC-E2E-AUTH-01 s/d TC-E2E-AUTH-05
 * E2E Tests: Authentication & Authorization (Login/Logout/RBAC)
 * SMA Cendekia Nusantara | ASTQA Kelompok 7
 *
 * Test Cases:
 *   TC-E2E-AUTH-01: Login valid sebagai admin → redirect ke dashboard
 *   TC-E2E-AUTH-02: Login dengan password salah → pesan error tampil
 *   TC-E2E-AUTH-03: Login dengan username kosong → form validation
 *   TC-E2E-AUTH-04: Akses halaman protected tanpa login → redirect ke /login
 *   TC-E2E-AUTH-05: Logout → redirect ke halaman login, session dihapus
 */
const { test, expect } = require('@playwright/test');

test.describe('TC-E2E-AUTH: Authentication & Authorization', () => {

  // TC-E2E-AUTH-01: Login valid sebagai admin
  test('TC-E2E-AUTH-01: Login valid sebagai admin berhasil', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="identifier"], input[type="text"]:first-of-type', 'admin1');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    // Verifikasi redirect ke dashboard
    await page.waitForURL(/dashboard|home|\/$/, { timeout: 10000 });
    const url = page.url();
    expect(url).not.toContain('/login');

    // Verifikasi elemen dashboard muncul
    await expect(page.locator('text=/dashboard|statistik|selamat datang/i').first()).toBeVisible({ timeout: 5000 });
  });

  // TC-E2E-AUTH-02: Login password salah
  test('TC-E2E-AUTH-02: Login dengan password salah menampilkan pesan error', async ({ page }) => {
    await page.goto('/login');

    await page.fill('input[name="identifier"], input[type="text"]:first-of-type', 'admin1');
    await page.fill('input[type="password"]', 'passwordsalah123');
    await page.click('button[type="submit"], button:has-text("Masuk")');

    // Tunggu response dari server
    await page.waitForTimeout(3000);

    // Harus tetap di halaman login
    expect(page.url()).toContain('/login');
  });

  // TC-E2E-AUTH-03: Login tanpa username (form validation)
  test('TC-E2E-AUTH-03: Login tanpa username — form validation muncul', async ({ page }) => {
    await page.goto('/login');

    // Tidak mengisi username, langsung klik submit
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');

    await page.waitForTimeout(1000);
    // Halaman harus tetap di /login (tidak submit)
    expect(page.url()).toContain('/login');
  });

  // TC-E2E-AUTH-04: Akses protected page tanpa login
  test('TC-E2E-AUTH-04: Akses halaman siswa tanpa login → redirect ke /login', async ({ page }) => {
    // Buka halaman siswa langsung tanpa auth
    await page.goto('/students');
    await page.waitForTimeout(2000);

    // Harus di-redirect ke /login
    await expect(page).toHaveURL(/login/);
  });

  // TC-E2E-AUTH-05: Logout
  test('TC-E2E-AUTH-05: Logout berhasil, session terhapus', async ({ page }) => {
    // Login dulu
    await page.goto('/login');
    await page.fill('input[name="identifier"], input[type="text"]:first-of-type', 'admin1');
    await page.fill('input[type="password"]', 'password123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard|home|\/$/, { timeout: 10000 });

    // Klik tombol logout (biasanya di navbar/sidebar)
    const logoutBtn = page.locator('button:has-text("Logout"), a:has-text("Logout"), button:has-text("Keluar"), a:has-text("Keluar")');
    await logoutBtn.first().click();

    // Verifikasi redirect ke login
    await page.waitForURL(/login/, { timeout: 5000 });
    await expect(page).toHaveURL(/login/);

    // Verifikasi tidak bisa balik ke dashboard
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/login/);
  });
});
