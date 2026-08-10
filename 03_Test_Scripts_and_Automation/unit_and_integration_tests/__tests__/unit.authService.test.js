/**
 * unit.authService.test.js
 * Unit Test - Auth Service Functions
 * SMA Cendekia Nusantara - ASTQA Kelompok 7
 *
 * Menguji: generateTokens, hashPassword, comparePassword,
 *          validateEmail, validatePasswordStrength, login, logout, changePassword
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  generateTokens,
  verifyToken,
  hashPassword,
  comparePassword,
  validateEmail,
  validatePasswordStrength,
  login,
  logout,
  changePassword,
} = require('../src/authService');

const JWT_SECRET = 'test_secret_key_astqa_kelompok7';
process.env.JWT_SECRET = JWT_SECRET;

// ─── HELPER: Mock Prisma ───────────────────────────────────────────
const createMockPrisma = (overrides = {}) => ({
  user: {
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
  refreshToken: {
    create: jest.fn(),
    deleteMany: jest.fn(),
  },
  ...overrides,
});

describe('UT-AUTH: Auth Service Unit Tests', () => {

  // ─── generateTokens ───────────────────────────────────────────────
  describe('generateTokens()', () => {
    test('UT-AUTH-01: Menghasilkan accessToken dan refreshToken yang valid', () => {
      const { accessToken, refreshToken } = generateTokens(1, 'admin');
      expect(typeof accessToken).toBe('string');
      expect(typeof refreshToken).toBe('string');
      expect(accessToken.split('.').length).toBe(3); // JWT format: header.payload.signature
      expect(refreshToken.split('.').length).toBe(3);
    });

    test('UT-AUTH-02: accessToken berisi userId dan role yang benar', () => {
      const { accessToken } = generateTokens(42, 'guru');
      const decoded = jwt.verify(accessToken, JWT_SECRET);
      expect(decoded.userId).toBe(42);
      expect(decoded.role).toBe('guru');
    });

    test('UT-AUTH-03: accessToken berbeda untuk userId berbeda', () => {
      const token1 = generateTokens(1, 'admin').accessToken;
      const token2 = generateTokens(2, 'admin').accessToken;
      expect(token1).not.toBe(token2);
    });
  });

  // ─── hashPassword & comparePassword ───────────────────────────────
  describe('hashPassword() & comparePassword()', () => {
    test('UT-AUTH-04: hashPassword menghasilkan bcrypt hash (60 karakter)', async () => {
      const hash = await hashPassword('password123');
      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(60);
      expect(hash.startsWith('$2')).toBe(true); // bcrypt prefix
    });

    test('UT-AUTH-05: comparePassword mengembalikan true untuk password yang benar', async () => {
      const hash = await hashPassword('password123');
      const result = await comparePassword('password123', hash);
      expect(result).toBe(true);
    });

    test('UT-AUTH-06: comparePassword mengembalikan false untuk password yang salah', async () => {
      const hash = await hashPassword('password123');
      const result = await comparePassword('wrongpassword', hash);
      expect(result).toBe(false);
    });

    test('UT-AUTH-07: Hash yang sama tidak dihasilkan dua kali (salted)', async () => {
      const hash1 = await hashPassword('password123');
      const hash2 = await hashPassword('password123');
      expect(hash1).not.toBe(hash2); // bcrypt selalu menghasilkan salt berbeda
    });
  });

  // ─── validateEmail ────────────────────────────────────────────────
  describe('validateEmail()', () => {
    test('UT-AUTH-08: Email valid mengembalikan true', () => {
      expect(validateEmail('admin@sma.sch.id')).toBe(true);
      expect(validateEmail('user.name+tag@example.com')).toBe(true);
    });

    test('UT-AUTH-09: Email tidak valid (tanpa @) mengembalikan false', () => {
      expect(validateEmail('invalid-email')).toBe(false);
    });

    test('UT-AUTH-10: Email tidak valid (tanpa domain) mengembalikan false', () => {
      expect(validateEmail('user@')).toBe(false);
    });

    test('UT-AUTH-11: String kosong mengembalikan false', () => {
      expect(validateEmail('')).toBe(false);
    });
  });

  // ─── validatePasswordStrength ──────────────────────────────────────
  describe('validatePasswordStrength()', () => {
    test('UT-AUTH-12: Password 6 karakter (batas minimum) valid', () => {
      expect(validatePasswordStrength('abcdef')).toBe(true);
    });

    test('UT-AUTH-13: Password 5 karakter (di bawah minimum) tidak valid', () => {
      expect(validatePasswordStrength('abcde')).toBe(false);
    });

    test('UT-AUTH-14: Password kosong tidak valid', () => {
      expect(validatePasswordStrength('')).toBe(false);
    });

    test('UT-AUTH-15: Password null tidak valid', () => {
      expect(validatePasswordStrength(null)).toBe(false);
    });

    test('UT-AUTH-16: Password panjang (255 karakter) valid', () => {
      const longPass = 'a'.repeat(255);
      expect(validatePasswordStrength(longPass)).toBe(true);
    });
  });

  // ─── login() ──────────────────────────────────────────────────────
  describe('login()', () => {
    test('UT-AUTH-17: Login berhasil dengan kredensial valid', async () => {
      const hashedPwd = await bcrypt.hash('password123', 10);
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 1, username: 'admin1', email: 'admin@sma.sch.id',
        password: hashedPwd, isActive: true,
        role: { name: 'admin' }, teacher: null, student: null, parent: null
      });
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.refreshToken.create.mockResolvedValue({});

      const result = await login(mockPrisma, 'admin1', 'password123');
      expect(result).toHaveProperty('accessToken');
      expect(result).toHaveProperty('refreshToken');
      expect(result).toHaveProperty('user');
      expect(result.user).not.toHaveProperty('password'); // password tidak boleh dikembalikan
    });

    test('UT-AUTH-18: Login gagal — user tidak ditemukan', async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findFirst.mockResolvedValue(null);
      await expect(login(mockPrisma, 'notexist', 'password123'))
        .rejects.toEqual({ status: 401, message: 'Username atau password salah' });
    });

    test('UT-AUTH-19: Login gagal — password salah', async () => {
      const hashedPwd = await bcrypt.hash('correctpassword', 10);
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 1, username: 'admin1', password: hashedPwd, isActive: true,
        role: { name: 'admin' }, teacher: null, student: null, parent: null
      });
      await expect(login(mockPrisma, 'admin1', 'wrongpassword'))
        .rejects.toEqual({ status: 401, message: 'Username atau password salah' });
    });

    test('UT-AUTH-20: Login gagal — user tidak aktif (isActive: false)', async () => {
      // Prisma WHERE clause menyertakan isActive: true, jadi user tidak aktif tidak akan ditemukan
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findFirst.mockResolvedValue(null); // tidak ditemukan karena isActive: true dalam WHERE
      await expect(login(mockPrisma, 'inactive_user', 'password123'))
        .rejects.toEqual({ status: 401, message: 'Username atau password salah' });
    });

    test('UT-AUTH-21: Login berhasil — refreshToken disimpan ke DB', async () => {
      const hashedPwd = await bcrypt.hash('password123', 10);
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findFirst.mockResolvedValue({
        id: 5, username: 'guru5', password: hashedPwd, isActive: true,
        role: { name: 'guru' }, teacher: null, student: null, parent: null
      });
      mockPrisma.user.update.mockResolvedValue({});
      mockPrisma.refreshToken.create.mockResolvedValue({});

      await login(mockPrisma, 'guru5', 'password123');
      expect(mockPrisma.refreshToken.create).toHaveBeenCalledTimes(1);
      expect(mockPrisma.refreshToken.create).toHaveBeenCalledWith(
        expect.objectContaining({ data: expect.objectContaining({ userId: 5 }) })
      );
    });
  });

  // ─── logout() ─────────────────────────────────────────────────────
  describe('logout()', () => {
    test('UT-AUTH-22: logout() menghapus semua refreshToken user', async () => {
      const mockPrisma = createMockPrisma();
      mockPrisma.refreshToken.deleteMany.mockResolvedValue({ count: 2 });

      await logout(mockPrisma, 1);
      expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({ where: { userId: 1 } });
    });
  });

  // ─── changePassword() ─────────────────────────────────────────────
  describe('changePassword()', () => {
    test('UT-AUTH-23: changePassword berhasil dengan password lama yang benar', async () => {
      const hashedOld = await bcrypt.hash('oldpassword', 10);
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, password: hashedOld });
      mockPrisma.user.update.mockResolvedValue({});

      await expect(changePassword(mockPrisma, 1, 'oldpassword', 'newpassword')).resolves.not.toThrow();
      expect(mockPrisma.user.update).toHaveBeenCalledTimes(1);
    });

    test('UT-AUTH-24: changePassword gagal dengan password lama yang salah', async () => {
      const hashedOld = await bcrypt.hash('correctpassword', 10);
      const mockPrisma = createMockPrisma();
      mockPrisma.user.findUnique.mockResolvedValue({ id: 1, password: hashedOld });

      await expect(changePassword(mockPrisma, 1, 'wrongoldpassword', 'newpassword'))
        .rejects.toEqual({ status: 400, message: 'Password lama tidak sesuai' });
      expect(mockPrisma.user.update).not.toHaveBeenCalled();
    });
  });
});
