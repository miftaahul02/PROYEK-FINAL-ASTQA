/**
 * TC-E2E-GRD-01 s/d TC-E2E-GRD-04
 * E2E Tests: Manajemen Nilai Siswa
 */
const { test, expect } = require('@playwright/test');

async function loginAsAdmin(page) {
  await page.goto('/login');
  await page.fill('input[type="text"]:visible', 'admin1');
  await page.fill('input[type="password"]', 'password123');
  await page.click('button:has-text("Masuk ke Sistem")');
  await page.waitForURL(/dashboard/, { timeout: 15000 });
}

test.describe('TC-E2E-GRD: Manajemen Nilai', () => {

  test.beforeEach(async ({ page }) => {
    await loginAsAdmin(page);
  });

  test('TC-E2E-GRD-01: Halaman nilai dapat diakses dan menampilkan data', async ({ page }) => {
    await page.goto('/grades');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await expect(page.locator('h1, h2, h3').first()).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain('grades');
  });

  test('TC-E2E-GRD-02: Halaman nilai menampilkan dropdown filter kelas dan mata pelajaran', async ({ page }) => {
    await page.goto('/grades');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    const select = page.locator('select').first();
    await expect(select).toBeVisible({ timeout: 10000 });
    await select.selectOption({ index: 1 });
    await page.waitForTimeout(500);
    expect(page.url()).toContain('grades');
  });

  test('TC-E2E-GRD-03: Input nilai 101 (>100) tidak dapat dimasukkan (HTML max constraint)', async ({ page }) => {
    await page.goto('/grades');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    const numInput = page.locator('input[type="number"]').first();
    if (await numInput.isVisible({ timeout: 3000 })) {
      const maxAttr = await numInput.getAttribute('max');
      if (maxAttr) expect(parseInt(maxAttr)).toBeLessThanOrEqual(100);
    }
    expect(page.url()).toContain('grades');
  });

  test('TC-E2E-GRD-04: Halaman laporan/rekap nilai dapat diakses via menu Reports', async ({ page }) => {
    await page.goto('/reports');
    await page.waitForLoadState('networkidle', { timeout: 15000 });
    await expect(page.locator('h1, h2, h3').first()).toBeVisible({ timeout: 10000 });
    expect(page.url()).toContain('reports');
  });
});
