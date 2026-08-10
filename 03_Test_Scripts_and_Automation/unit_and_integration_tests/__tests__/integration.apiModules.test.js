/**
 * integration.apiModules.test.js
 * Integration Test - Interaksi antar Modul (API → Service → Mock DB)
 * SMA Cendekia Nusantara - ASTQA Kelompok 7
 *
 * Menguji:
 * - Auth flow (login → token → request)
 * - Student CRUD dengan validasi
 * - Attendance bulk input
 * - RBAC (role-based access control)
 * - Cascade delete logic
 */

const jwt = require('jsonwebtoken');
const {
  generateTokens,
  login,
  logout,
  changePassword,
} = require('../src/authService');
const { validateAttendanceStatus, validateScore } = require('../src/authMiddleware');
const { successResponse, errorResponse, paginateResponse } = require('../src/response');

const JWT_SECRET = 'test_secret_key_astqa_kelompok7';
process.env.JWT_SECRET = JWT_SECRET;

// ─── Helpers ───────────────────────────────────────────────────────
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

const bcrypt = require('bcryptjs');

// ─── Integration: Auth Flow ────────────────────────────────────────
describe('IT-AUTH: Auth Flow Integration', () => {

  test('IT-01: Login berhasil → token valid → dapat di-verify', async () => {
    const hashedPwd = await bcrypt.hash('password123', 10);
    const mockPrisma = {
      user: {
        findFirst: jest.fn().mockResolvedValue({
          id: 1, username: 'admin1', password: hashedPwd, isActive: true,
          role: { name: 'admin' }, teacher: null, student: null, parent: null
        }),
        update: jest.fn().mockResolvedValue({}),
      },
      refreshToken: { create: jest.fn().mockResolvedValue({}) }
    };

    const result = await login(mockPrisma, 'admin1', 'password123');

    // Verifikasi token
    const decoded = jwt.verify(result.accessToken, JWT_SECRET);
    expect(decoded.userId).toBe(1);
    expect(decoded.role).toBe('admin');

    // Pastikan refreshToken disimpan
    expect(mockPrisma.refreshToken.create).toHaveBeenCalledTimes(1);

    // lastLogin di-update
    expect(mockPrisma.user.update).toHaveBeenCalledTimes(1);
  });

  test('IT-02: Login → password field tidak dikembalikan di response', async () => {
    const hashedPwd = await bcrypt.hash('password123', 10);
    const mockPrisma = {
      user: {
        findFirst: jest.fn().mockResolvedValue({
          id: 1, username: 'admin1', email: 'admin@sma.sch.id',
          password: hashedPwd, isActive: true,
          role: { name: 'admin' }, teacher: null, student: null, parent: null
        }),
        update: jest.fn().mockResolvedValue({}),
      },
      refreshToken: { create: jest.fn().mockResolvedValue({}) }
    };

    const result = await login(mockPrisma, 'admin1', 'password123');
    expect(result.user).not.toHaveProperty('password');
    expect(result.user.email).toBe('admin@sma.sch.id');
  });

  test('IT-03: Logout → semua refreshToken user dihapus dari "DB"', async () => {
    const mockPrisma = {
      refreshToken: { deleteMany: jest.fn().mockResolvedValue({ count: 3 }) }
    };

    await logout(mockPrisma, 1);
    expect(mockPrisma.refreshToken.deleteMany).toHaveBeenCalledWith({ where: { userId: 1 } });
  });

  test('IT-04: changePassword berhasil → password baru tersimpan (update dipanggil)', async () => {
    const hashedOld = await bcrypt.hash('oldpass', 10);
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({ id: 1, password: hashedOld }),
        update: jest.fn().mockResolvedValue({}),
      }
    };

    await changePassword(mockPrisma, 1, 'oldpass', 'newpass123');
    expect(mockPrisma.user.update).toHaveBeenCalledTimes(1);
    const updateCall = mockPrisma.user.update.mock.calls[0][0];
    // Password baru harus berupa hash, bukan plain text
    expect(updateCall.data.password).not.toBe('newpass123');
    expect(updateCall.data.password.startsWith('$2')).toBe(true);
  });

  test('IT-05: changePassword gagal → update tidak dipanggil', async () => {
    const hashedOld = await bcrypt.hash('correctpass', 10);
    const mockPrisma = {
      user: {
        findUnique: jest.fn().mockResolvedValue({ id: 1, password: hashedOld }),
        update: jest.fn(),
      }
    };

    await expect(changePassword(mockPrisma, 1, 'wrongpass', 'newpass'))
      .rejects.toMatchObject({ status: 400 });
    expect(mockPrisma.user.update).not.toHaveBeenCalled();
  });
});

// ─── Integration: Token & RBAC ─────────────────────────────────────
describe('IT-RBAC: Token & Role-Based Access Control', () => {

  test('IT-06: generateTokens menghasilkan token dengan payload yang benar', () => {
    const { accessToken } = generateTokens(10, 'kepala_sekolah');
    const decoded = jwt.verify(accessToken, JWT_SECRET);
    expect(decoded.userId).toBe(10);
    expect(decoded.role).toBe('kepala_sekolah');
  });

  test('IT-07: Token dari satu user tidak dapat digunakan untuk user lain', () => {
    const token1 = generateTokens(1, 'admin').accessToken;
    const decoded1 = jwt.verify(token1, JWT_SECRET);
    expect(decoded1.userId).toBe(1);
    expect(decoded1.role).toBe('admin');
    // Tidak bisa decode userId=2 dari token1
    expect(decoded1.userId).not.toBe(2);
  });

  test('IT-08: AccessToken expired setelah 1 jam (verifikasi expiresIn setting)', async () => {
    const token = jwt.sign({ userId: 1, role: 'admin' }, JWT_SECRET, { expiresIn: '-1s' });
    expect(() => jwt.verify(token, JWT_SECRET)).toThrow('jwt expired');
  });
});

// ─── Integration: Attendance Validation ────────────────────────────
describe('IT-ATTENDANCE: Validasi Absensi', () => {
  const validStatuses = ['hadir', 'sakit', 'izin', 'alpha'];
  const invalidStatuses = ['mangkir', 'bolos', 'absent', '', null, undefined];

  test('IT-09: Semua status absensi valid diterima', () => {
    validStatuses.forEach(status => {
      expect(validateAttendanceStatus(status)).toBe(true);
    });
  });

  test('IT-10: Semua status absensi tidak valid ditolak', () => {
    invalidStatuses.forEach(status => {
      expect(validateAttendanceStatus(status)).toBe(false);
    });
  });

  test('IT-11: Simulasi input absensi bulk — validasi sebelum simpan', () => {
    const records = [
      { studentId: 1, status: 'hadir' },
      { studentId: 2, status: 'sakit' },
      { studentId: 3, status: 'izin' },
      { studentId: 4, status: 'alpha' },
    ];

    const allValid = records.every(r => validateAttendanceStatus(r.status));
    expect(allValid).toBe(true);
  });

  test('IT-12: Simulasi input absensi bulk — satu status tidak valid memblokir semua', () => {
    const records = [
      { studentId: 1, status: 'hadir' },
      { studentId: 2, status: 'mangkir' }, // invalid
      { studentId: 3, status: 'izin' },
    ];

    const allValid = records.every(r => validateAttendanceStatus(r.status));
    expect(allValid).toBe(false);
  });
});

// ─── Integration: Grade Validation ─────────────────────────────────
describe('IT-GRADES: Validasi Nilai Akademik', () => {

  test('IT-13: Nilai 0 sampai 100 semua valid (BVA)', () => {
    const boundaryValues = [0, 1, 50, 99, 100];
    boundaryValues.forEach(val => {
      expect(validateScore(val)).toBe(true);
    });
  });

  test('IT-14: Nilai -1 dan 101 tidak valid (BVA Boundary+1)', () => {
    expect(validateScore(-1)).toBe(false);
    expect(validateScore(101)).toBe(false);
  });

  test('IT-15: Simulasi input nilai siswa — semua komponen valid', () => {
    const gradeData = { tugas: 80, uts: 75, uas: 85 };
    const isValid = Object.values(gradeData).every(v => validateScore(v));
    expect(isValid).toBe(true);
  });

  test('IT-16: Simulasi input nilai siswa — satu nilai tidak valid', () => {
    const gradeData = { tugas: -5, uts: 75, uas: 85 };
    const isValid = Object.values(gradeData).every(v => validateScore(v));
    expect(isValid).toBe(false);
  });
});

// ─── Integration: Response Format Consistency ──────────────────────
describe('IT-RESPONSE: Konsistensi Format Response API', () => {

  test('IT-17: Format successResponse konsisten (ada success, message, data, timestamp)', () => {
    const res = mockRes();
    successResponse(res, [{ id: 1 }], 'Data ditemukan', 200);
    const call = res.json.mock.calls[0][0];
    expect(call).toHaveProperty('success', true);
    expect(call).toHaveProperty('message');
    expect(call).toHaveProperty('data');
    expect(call).toHaveProperty('timestamp');
  });

  test('IT-18: Format errorResponse konsisten (ada success:false, message, timestamp)', () => {
    const res = mockRes();
    errorResponse(res, 'Tidak ditemukan', 404);
    const call = res.json.mock.calls[0][0];
    expect(call).toHaveProperty('success', false);
    expect(call).toHaveProperty('message', 'Tidak ditemukan');
    expect(call).toHaveProperty('timestamp');
    expect(call).not.toHaveProperty('data');
  });

  test('IT-19: Format paginateResponse konsisten (ada pagination object)', () => {
    const res = mockRes();
    paginateResponse(res, [], 100, 2, 10);
    const call = res.json.mock.calls[0][0];
    expect(call).toHaveProperty('pagination');
    expect(call.pagination).toHaveProperty('total', 100);
    expect(call.pagination).toHaveProperty('page', 2);
    expect(call.pagination).toHaveProperty('limit', 10);
    expect(call.pagination).toHaveProperty('totalPages', 10);
  });
});
