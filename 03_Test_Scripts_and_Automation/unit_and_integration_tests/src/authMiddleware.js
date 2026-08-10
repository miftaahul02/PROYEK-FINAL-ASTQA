/**
 * authMiddleware.js
 * Middleware autentikasi dan autorisasi JWT
 * SMA Cendekia Nusantara - ASTQA Kelompok 7
 */

const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key_astqa_kelompok7';

const errorResponse = (res, message, statusCode) => {
  return res.status(statusCode).json({ success: false, message, timestamp: new Date().toISOString() });
};

/**
 * Middleware authenticate — verifikasi JWT token dari header Authorization
 */
const authenticate = (prisma) => async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return errorResponse(res, 'Token tidak ditemukan', 401);

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      include: { role: true, student: true, teacher: true, parent: true }
    });

    if (!user || !user.isActive) return errorResponse(res, 'User tidak ditemukan atau tidak aktif', 401);

    req.user = user;
    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') return errorResponse(res, 'Token telah kadaluarsa', 401);
    return errorResponse(res, 'Token tidak valid', 401);
  }
};

/**
 * Middleware authorize — cek role pengguna
 */
const authorize = (...roles) => (req, res, next) => {
  if (!req.user) return errorResponse(res, 'Unauthorized', 401);
  if (!roles.includes(req.user.role.name)) {
    return errorResponse(res, 'Anda tidak memiliki akses ke fitur ini', 403);
  }
  next();
};

/**
 * Validasi attendance status enum
 */
const VALID_ATTENDANCE_STATUS = ['hadir', 'sakit', 'izin', 'alpha'];
const validateAttendanceStatus = (status) => VALID_ATTENDANCE_STATUS.includes(status);

/**
 * Validasi nilai akademik (0-100)
 */
const validateScore = (score) => {
  if (score === null || score === undefined) return true; // optional
  return typeof score === 'number' && score >= 0 && score <= 100;
};

module.exports = { authenticate, authorize, validateAttendanceStatus, validateScore };
