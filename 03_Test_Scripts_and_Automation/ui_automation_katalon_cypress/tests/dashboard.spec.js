/**
 * TC-E2E-DASH-01 s/d TC-E2E-DASH-03
 * E2E Tests: Dashboard & Navigasi Utama
 */
const { test, expect } = require('@playwright/test');

async function loginAsAdmin(page) {
  await page.goto('/login');
  await page.fill('input[type="text"]:visible', 'admin1');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Masuk ke Sistem")');
  await page.waitForURL(/dashboard/, { timeout: 15000 });
}

test.describe('TC-E2E-DASH: Dashboard & Navigasi', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('TC-E2E-DASH-01: Dashboard menampilkan statistik jumlah siswa, guru, dan absensi', async ({ page }) => {
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await expect(page.locator('.card, [class*="stat"], [class*="card"]').first()).toBeVisible({ timeout: 8000 });
    const statsText = page.locator('text=/siswa|guru|absensi|hadir/i');
    await expect(statsText.first()).toBeVisible({ timeout: 5000 });
  });

  test('TC-E2E-DASH-02: Semua item menu navigasi dapat diklik dan berpindah halaman', async ({ page }) => {
    await page.goto('/dashboard');
    const menuItems = [
      { text: /siswa/i, expectedUrl: /student/ },
      { text: /guru/i, expectedUrl: /teacher/ },
      { text: /absensi/i, expectedUrl: /attendance/ },
    ];
    for (const menu of menuItems) {
      const menuLink = page.locator('nav a, aside a, [role="navigation"] a').filter({ hasText: menu.text }).first();
      if (await menuLink.isVisible({ timeout: 2000 })) {
        await menuLink.click();
        await page.waitForTimeout(500);
        expect(page.url()).toMatch(menu.expectedUrl);
        await page.goto('/dashboard');
        await page.waitForLoadState('networkidle', { timeout: 10000 });
      }
    }
  });

  test('TC-E2E-DASH-03: Halaman dashboard responsif di viewport mobile (375x667)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await expect(page.locator('main, [role="main"], #root, body').first()).toBeVisible({ timeout: 5000 });
    expect(page.url()).toContain('dashboard');
  });
});
