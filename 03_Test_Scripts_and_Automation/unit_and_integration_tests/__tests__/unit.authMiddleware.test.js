/**
 * unit.authMiddleware.test.js
 * Unit Test - Authentication & Authorization Middleware
 * SMA Cendekia Nusantara - ASTQA Kelompok 7
 *
 * Menguji: authenticate(), authorize(), validateAttendanceStatus(), validateScore()
 */

const jwt = require('jsonwebtoken');
const {
  authenticate,
  authorize,
  validateAttendanceStatus,
  validateScore,
} = require('../src/authMiddleware');

const JWT_SECRET = 'test_secret_key_astqa_kelompok7';
process.env.JWT_SECRET = JWT_SECRET;

// Mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

// Buat JWT token untuk testing
const makeToken = (payload, secret = JWT_SECRET, options = { expiresIn: '1h' }) =>
  jwt.sign(payload, secret, options);

// Mock Prisma
const DEFAULT_USER = {
  id: 1, username: 'admin1', isActive: true,
  role: { name: 'admin' }, student: null, teacher: null, parent: null
};

const createMockPrisma = (userOverride = DEFAULT_USER) => ({
  user: {
    findUnique: jest.fn().mockResolvedValue(userOverride),
  }
});

describe('UT-MIDDLEWARE: Auth Middleware Unit Tests', () => {

  // ─── authenticate() ───────────────────────────────────────────────
  describe('authenticate()', () => {
    test('UT-MW-01: Mengembalikan 401 jika tidak ada Authorization header', async () => {
      const req = { headers: {} };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma();

      await authenticate(prisma)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Token tidak ditemukan' }));
      expect(next).not.toHaveBeenCalled();
    });

    test('UT-MW-02: Mengembalikan 401 jika Authorization header tanpa Bearer', async () => {
      const req = { headers: { authorization: 'Basic abc123' } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma();

      await authenticate(prisma)(req, res, next);
      // Token undefined — akan mengembalikan 401
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('UT-MW-03: next() dipanggil jika token valid', async () => {
      const token = makeToken({ userId: 1, role: 'admin' });
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma();

      await authenticate(prisma)(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
      expect(req.user).toBeDefined();
      expect(req.user.role.name).toBe('admin');
    });

    test('UT-MW-04: req.user ter-set dengan data lengkap (include role, student, teacher)', async () => {
      const token = makeToken({ userId: 1, role: 'siswa' });
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma({
        id: 1, username: 'siswa1', isActive: true,
        role: { name: 'siswa' },
        student: { id: 5, nis: 'S001', fullName: 'Andi Susanto' },
        teacher: null, parent: null
      });

      await authenticate(prisma)(req, res, next);
      expect(req.user.student).toEqual({ id: 5, nis: 'S001', fullName: 'Andi Susanto' });
    });

    test('UT-MW-05: Mengembalikan 401 TokenExpiredError untuk token expired', async () => {
      const token = makeToken({ userId: 1 }, JWT_SECRET, { expiresIn: '-1s' }); // sudah expired
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma();

      await authenticate(prisma)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Token telah kadaluarsa' }));
    });

    test('UT-MW-06: Mengembalikan 401 untuk token yang tidak valid (dipalsukan)', async () => {
      const req = { headers: { authorization: 'Bearer invalid.token.here' } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma();

      await authenticate(prisma)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ message: 'Token tidak valid' }));
    });

    test('UT-MW-07: Mengembalikan 401 jika user tidak ditemukan di DB', async () => {
      const token = makeToken({ userId: 99999, role: 'admin' });
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma(null); // user tidak ditemukan

      await authenticate(prisma)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'User tidak ditemukan atau tidak aktif' })
      );
    });

    test('UT-MW-08: Mengembalikan 401 jika user isActive=false', async () => {
      const token = makeToken({ userId: 2, role: 'guru' });
      const req = { headers: { authorization: `Bearer ${token}` } };
      const res = mockRes();
      const next = jest.fn();
      const prisma = createMockPrisma({
        id: 2, username: 'inactiveuser', isActive: false,
        role: { name: 'guru' }, student: null, teacher: null, parent: null
      });

      await authenticate(prisma)(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });
  });

  // ─── authorize() ──────────────────────────────────────────────────
  describe('authorize()', () => {
    test('UT-MW-09: next() dipanggil jika role sesuai', () => {
      const req = { user: { role: { name: 'admin' } } };
      const res = mockRes();
      const next = jest.fn();

      authorize('admin', 'kepala_sekolah')(req, res, next);
      expect(next).toHaveBeenCalledTimes(1);
    });

    test('UT-MW-10: Mengembalikan 403 jika role tidak sesuai', () => {
      const req = { user: { role: { name: 'siswa' } } };
      const res = mockRes();
      const next = jest.fn();

      authorize('admin', 'guru')(req, res, next);
      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({ message: 'Anda tidak memiliki akses ke fitur ini' })
      );
      expect(next).not.toHaveBeenCalled();
    });

    test('UT-MW-11: Mengembalikan 401 jika req.user tidak ada', () => {
      const req = {};
      const res = mockRes();
      const next = jest.fn();

      authorize('admin')(req, res, next);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('UT-MW-12: Mendukung multiple roles', () => {
      const roles = ['admin', 'kepala_sekolah', 'wali_kelas', 'guru', 'guru_bk'];
      roles.forEach(role => {
        const req = { user: { role: { name: role } } };
        const res = mockRes();
        const next = jest.fn();
        authorize('admin', 'kepala_sekolah', 'wali_kelas', 'guru', 'guru_bk')(req, res, next);
        expect(next).toHaveBeenCalledTimes(1);
      });
    });
  });

  // ─── validateAttendanceStatus() ───────────────────────────────────
  describe('validateAttendanceStatus()', () => {
    test('UT-MW-13: Status hadir valid', () => {
      expect(validateAttendanceStatus('hadir')).toBe(true);
    });

    test('UT-MW-14: Status sakit valid', () => {
      expect(validateAttendanceStatus('sakit')).toBe(true);
    });

    test('UT-MW-15: Status izin valid', () => {
      expect(validateAttendanceStatus('izin')).toBe(true);
    });

    test('UT-MW-16: Status alpha valid', () => {
      expect(validateAttendanceStatus('alpha')).toBe(true);
    });

    test('UT-MW-17: Status mangkir tidak valid', () => {
      expect(validateAttendanceStatus('mangkir')).toBe(false);
    });

    test('UT-MW-18: Status kosong tidak valid', () => {
      expect(validateAttendanceStatus('')).toBe(false);
    });

    test('UT-MW-19: Status undefined tidak valid', () => {
      expect(validateAttendanceStatus(undefined)).toBe(false);
    });
  });

  // ─── validateScore() ──────────────────────────────────────────────
  describe('validateScore()', () => {
    test('UT-MW-20: Nilai 0 (batas minimum) valid', () => {
      expect(validateScore(0)).toBe(true);
    });

    test('UT-MW-21: Nilai 100 (batas maksimum) valid', () => {
      expect(validateScore(100)).toBe(true);
    });

    test('UT-MW-22: Nilai 75 (dalam range) valid', () => {
      expect(validateScore(75)).toBe(true);
    });

    test('UT-MW-23: Nilai -1 (di bawah minimum) tidak valid', () => {
      expect(validateScore(-1)).toBe(false);
    });

    test('UT-MW-24: Nilai 101 (di atas maksimum) tidak valid', () => {
      expect(validateScore(101)).toBe(false);
    });

    test('UT-MW-25: Nilai null dianggap valid (field opsional)', () => {
      expect(validateScore(null)).toBe(true);
    });

    test('UT-MW-26: Nilai undefined dianggap valid (field opsional)', () => {
      expect(validateScore(undefined)).toBe(true);
    });
  });
});
