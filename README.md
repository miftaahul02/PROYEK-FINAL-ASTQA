# Final Project — Advanced Software Testing & Quality Assurance
## Sistem Informasi SMA Cendekia Nusantara

**Kelompok 7** | Semester Genap 2025/2026

| No | Nama | NIM |
|----|------|-----|
| 1 | Miftahul Jannah | 023 |
| 2 | Dian Ramadhani | 323 |
| 3 | Futri Ayu Resky Amalia | 623 |
| 4 | Syarifah Azizah. M | 423 |

## Media Project

- Video Demo YouTube: https://youtu.be/nMR-HD4IrKo
- Publikasi Instagram: https://www.instagram.com/reel/Db0LfkYtwOrFR5ffYIwd1CyRSL1f3mPsyFYR7Y0/?igsh=MnVrcnp6bmV6dHZh
---


## Struktur Repository

```
FinalProject_ASTQA_Kelompok7/
├── 01_Documents/
│   ├── Document_SRS.pdf          # Software Requirements Specification
│   └── Document_SDD.pdf              # Software Design Document + ERD + API Contract
│
├── 02_Test_Plans_and_Reports/
│   ├── Master_Test_Plan_and_Report.pdf      # Master test plan + executive summary semua level
│   ├── Test_Cases_Matrix_EP_BVA.pdf         # 66 Test Case (EP + BVA, landscape)
│   └── Defect_Log_and_UAT_Signoff.pdf       # Defect log 4 item + UAT sign-off 4 role
│
└── 03_Test_Scripts_and_Automation/
    ├── unit_and_integration_tests/            # Jest 29 — Unit & Integration
    │   ├── src/
    │   │   ├── response.js                    # Utility response functions
    │   │   ├── authService.js                 # Auth business logic (injectable)
    │   │   └── authMiddleware.js              # Middleware + validators
    │   └── __tests__/
    │       ├── unit.response.test.js          # 15 unit tests
    │       ├── unit.authService.test.js       # 24 unit tests
    │       ├── unit.authMiddleware.test.js    # 26 unit tests
    │       └── integration.apiModules.test.js # 19 integration tests
    │
    ├── jmeter_or_postman_scripts/
    │   └── SMA_Cendekia_API_LoadTest.postman_collection.json  # 18 request + load test scenarios
    │
    └── ui_automation_playwright/              # Playwright — E2E UI Tests
        ├── playwright.config.js
        └── tests/
            ├── global.setup.js               # Auth state setup (login sekali)
            ├── auth.spec.js                  # TC-E2E-AUTH-01~05 (5 test cases)
            ├── students.spec.js              # TC-E2E-STD-01~05 (5 test cases)
            ├── attendance.spec.js            # TC-E2E-ATT-01~04 (4 test cases)
            ├── grades.spec.js                # TC-E2E-GRD-01~04 (4 test cases)
            └── dashboard.spec.js             # TC-E2E-DASH-01~03 (3 test cases)
```

---

## Ringkasan Hasil Testing

| Level Testing | Tool | Total TC | Passed | Failed | Coverage |
|---------------|------|----------|--------|--------|----------|
| Unit Test | Jest 29 | 65 | 65 | 0 | 98.88% |
| Integration Test | Jest 29 | 19 | 19 | 0 | — |
| System Test (Fungsional) | Manual + Postman | 35 | 33 | 2 | — |
| Performance / Load Test | Newman (Postman) | 5 skenario | SLA met | — | — |
| UAT | Manual (4 role) | 15 | 15 | 0 | — |
| E2E UI Test | Playwright | 21 | * | * | — |

> *E2E dijalankan saat aplikasi running. Lihat cara menjalankan di bawah.

**Defect ditemukan:** 4 (DEF-001~DEF-004) | 2 Fixed, 2 Won't Fix

---

## Cara Menjalankan Tests

### 1. Unit & Integration Tests (Jest)

```bash
cd 03_Test_Scripts_and_Automation/unit_and_integration_tests

npm install
npm test                  # jalankan semua test
npm run test:coverage     # dengan coverage report
```

**Hasil:** 84 tests passed, coverage 98.88% (tidak butuh server running)

---

### 2. API & Load Test (Postman Newman)

```bash
# Install Newman (sekali)
npm install -g newman

# Jalankan API test
newman run 03_Test_Scripts_and_Automation/jmeter_or_postman_scripts/SMA_Cendekia_API_LoadTest.postman_collection.json

# Simulasi load test 500 virtual user
newman run 03_Test_Scripts_and_Automation/jmeter_or_postman_scripts/SMA_Cendekia_API_LoadTest.postman_collection.json \
  --iteration-count 500 \
  --delay-request 10 \
  --reporters cli,json \
  --reporter-json-export newman-load-report.json
```

**Target SLA:** Response time avg ≤ 2000ms, Error rate < 1%

> Prasyarat: Backend running di `http://localhost:5000`

---

### 3. E2E UI Tests (Playwright)

```bash
cd 03_Test_Scripts_and_Automation/ui_automation_playwright

npm install
npx playwright install chromium

# Jalankan semua E2E test
npm test

# Jalankan dengan browser visible
npm run test:headed

# Generate HTML report
npm run test:report

# Jalankan per modul
npm run test:auth
npm run test:students
npm run test:attendance
npm run test:grades
npm run test:dashboard
```

> Prasyarat: Backend running di `http://localhost:5000` dan Frontend di `http://localhost:5173`

---

## Menjalankan Aplikasi

```bash
# Clone project utama
cd sisekolah

# Backend
cd backend
cp .env.example .env   # sesuaikan DB credentials
npm install
npx prisma migrate dev
npm run dev            # port 5000

# Frontend (terminal baru)
cd ../frontend
npm install
npm run dev            # port 5173
```

**Demo Accounts:**

| Role | Username | Password |
|------|----------|----------|
| Admin | admin1 | password123 |
| Kepala Sekolah | kepsek | password123 |
| Guru | guru5 | password123 |
| Siswa | siswa1 | password123 |

---


