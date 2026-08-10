/**
 * Global Setup - Login sekali, simpan auth state ke file
 * Digunakan oleh semua test agar tidak perlu login berulang
 */
const { test: setup, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const AUTH_FILE = path.join(__dirname, '..', '.auth', 'admin.json');

setup('authenticate as admin', async ({ page }) => {
  // Buat folder .auth jika belum ada
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  await page.goto('/login');
  await expect(page).toHaveTitle(/SMA Cendekia|SISMIK|Login/i);

  // Isi form login
  await page.fill('input[name="identifier"], input[placeholder*="username"], input[placeholder*="Username"], input[type="text"]', 'admin1');
  await page.fill('input[type="password"]', 'password123');

  // Klik tombol login
  await page.click('button[type="submit"], button:has-text("Masuk"), button:has-text("Login"), button:has-text("Sign In")');

  // Tunggu redirect ke dashboard (timeout lebih panjang)
  await page.waitForURL(/dashboard|home|\/$/, { timeout: 20000 });
  await expect(page.locator('text=/dashboard|beranda|selamat datang/i').first()).toBeVisible({ timeout: 5000 });

  // Simpan storage state (cookies + localStorage termasuk accessToken)
  await page.context().storageState({ path: AUTH_FILE });
  console.log('Auth state tersimpan ke:', AUTH_FILE);
});
