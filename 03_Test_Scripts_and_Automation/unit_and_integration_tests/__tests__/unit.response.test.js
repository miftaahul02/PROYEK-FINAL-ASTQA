/**
 * unit.response.test.js
 * Unit Test - Utility Response Functions
 * SMA Cendekia Nusantara - ASTQA Kelompok 7
 * 
 * Menguji: successResponse(), errorResponse(), paginateResponse()
 */

const { successResponse, errorResponse, paginateResponse } = require('../src/response');

// Mock res object
const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe('UT-RESPONSE: Utility Response Functions', () => {

  describe('successResponse()', () => {
    test('UT-01: Mengembalikan HTTP 200 dengan data dan message default', () => {
      const res = mockRes();
      successResponse(res, { name: 'Test Data' });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Success',
          data: { name: 'Test Data' },
        })
      );
    });

    test('UT-02: Mengembalikan HTTP 201 dengan custom message', () => {
      const res = mockRes();
      successResponse(res, { id: 1 }, 'Data berhasil dibuat', 201);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: true,
          message: 'Data berhasil dibuat',
          data: { id: 1 },
        })
      );
    });

    test('UT-03: Response selalu memiliki field timestamp', () => {
      const res = mockRes();
      successResponse(res, null);
      const call = res.json.mock.calls[0][0];
      expect(call).toHaveProperty('timestamp');
      expect(typeof call.timestamp).toBe('string');
    });
  });

  describe('errorResponse()', () => {
    test('UT-04: Mengembalikan HTTP 404 dengan message tidak ditemukan', () => {
      const res = mockRes();
      errorResponse(res, 'Data tidak ditemukan', 404);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          success: false,
          message: 'Data tidak ditemukan',
        })
      );
    });

    test('UT-05: Mengembalikan HTTP 401 untuk unauthorized', () => {
      const res = mockRes();
      errorResponse(res, 'Token tidak ditemukan', 401);
      expect(res.status).toHaveBeenCalledWith(401);
    });

    test('UT-06: Mengembalikan HTTP 403 untuk forbidden', () => {
      const res = mockRes();
      errorResponse(res, 'Akses ditolak', 403);
      expect(res.status).toHaveBeenCalledWith(403);
    });

    test('UT-07: Default status code adalah 500', () => {
      const res = mockRes();
      errorResponse(res, 'Internal Server Error');
      expect(res.status).toHaveBeenCalledWith(500);
    });

    test('UT-08: Menyertakan field errors jika diberikan', () => {
      const res = mockRes();
      const errors = [{ field: 'email', msg: 'Invalid' }];
      errorResponse(res, 'Validation Error', 422, errors);
      const call = res.json.mock.calls[0][0];
      expect(call).toHaveProperty('errors');
      expect(call.errors).toEqual(errors);
    });

    test('UT-09: Tidak menyertakan field errors jika null', () => {
      const res = mockRes();
      errorResponse(res, 'Error', 500, null);
      const call = res.json.mock.calls[0][0];
      expect(call).not.toHaveProperty('errors');
    });
  });

  describe('paginateResponse()', () => {
    test('UT-10: Menghitung totalPages dengan benar (100 data, limit 10)', () => {
      const res = mockRes();
      paginateResponse(res, [], 100, 1, 10);
      const call = res.json.mock.calls[0][0];
      expect(call.pagination.totalPages).toBe(10);
    });

    test('UT-11: totalPages = 0 jika total = 0', () => {
      const res = mockRes();
      paginateResponse(res, [], 0, 1, 10);
      const call = res.json.mock.calls[0][0];
      expect(call.pagination.totalPages).toBe(0);
    });

    test('UT-12: totalPages dibulatkan ke atas (15 data, limit 10 = 2 halaman)', () => {
      const res = mockRes();
      paginateResponse(res, [], 15, 1, 10);
      const call = res.json.mock.calls[0][0];
      expect(call.pagination.totalPages).toBe(2);
    });

    test('UT-13: page dan limit di-parse sebagai integer', () => {
      const res = mockRes();
      paginateResponse(res, [], 50, '2', '10');
      const call = res.json.mock.calls[0][0];
      expect(call.pagination.page).toBe(2);
      expect(call.pagination.limit).toBe(10);
    });

    test('UT-14: Selalu mengembalikan HTTP 200', () => {
      const res = mockRes();
      paginateResponse(res, [], 0, 1, 10);
      expect(res.status).toHaveBeenCalledWith(200);
    });

    test('UT-15: success selalu true pada paginateResponse', () => {
      const res = mockRes();
      paginateResponse(res, [{ id: 1 }], 1, 1, 10);
      const call = res.json.mock.calls[0][0];
      expect(call.success).toBe(true);
    });
  });
});
