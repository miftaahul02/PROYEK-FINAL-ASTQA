/**
 * authService.js
 * Logika bisnis autentikasi (tanpa dependency ke Prisma/DB)
 * Dapat ditest secara unit dengan mock
 * SMA Cendekia Nusantara - ASTQA Kelompok 7
 */

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'test_secret_key_astqa_kelompok7';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'test_refresh_secret_key_astqa';

/**
 * Generate JWT access token dan refresh token
 */
const generateTokens = (userId, role) => {
  const accessToken = jwt.sign(
    { userId, role },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
  const refreshToken = jwt.sign(
    { userId },
    JWT_REFRESH_SECRET,
    { expiresIn: '7d' }
  );
  return { accessToken, refreshToken };
};

/**
 * Verify JWT access token
 */
const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};

/**
 * Hash password menggunakan bcrypt
 */
const hashPassword = async (plainPassword) => {
  return bcrypt.hash(plainPassword, 10);
};

/**
 * Bandingkan password plain dengan hash
 */
const comparePassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

/**
 * Validasi format email
 */
const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validasi kekuatan password (minimal 6 karakter)
 */
const validatePasswordStrength = (password) => {
  if (!password || password.length < 6) return false;
  return true;
};

/**
 * Login logic (dengan injeksi prisma untuk testability)
 */
const login = async (prisma, identifier, password) => {
  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username: identifier }, { email: identifier }],
      isActive: true,
    },
    include: { role: true, teacher: true, student: true, parent: true }
  });

  if (!user) throw { status: 401, message: 'Username atau password salah' };

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) throw { status: 401, message: 'Username atau password salah' };

  const { accessToken, refreshToken } = generateTokens(user.id, user.role.name);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await prisma.user.update({ where: { id: user.id }, data: { lastLogin: new Date() } });
  await prisma.refreshToken.create({ data: { userId: user.id, token: refreshToken, expiresAt } });

  const { password: _, ...userSafe } = user;
  return { accessToken, refreshToken, user: userSafe };
};

/**
 * Logout — hapus semua refresh token user
 */
const logout = async (prisma, userId) => {
  await prisma.refreshToken.deleteMany({ where: { userId } });
};

/**
 * Change password
 */
const changePassword = async (prisma, userId, oldPassword, newPassword) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const valid = await bcrypt.compare(oldPassword, user.password);
  if (!valid) throw { status: 400, message: 'Password lama tidak sesuai' };
  const hashed = await bcrypt.hash(newPassword, 10);
  await prisma.user.update({ where: { id: userId }, data: { password: hashed } });
};

module.exports = {
  generateTokens,
  verifyToken,
  hashPassword,
  comparePassword,
  validateEmail,
  validatePasswordStrength,
  login,
  logout,
  changePassword,
};
