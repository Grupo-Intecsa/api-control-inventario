# Plan: Batch de Pruebas para api-control-inventario

## Resumen

El proyecto tiene **~4,500 líneas de código** en controllers, services y routes, **cero pruebas existentes**, y **Jest ya configurado** (`testEnvironment: "node"`). El objetivo es construir un batch de pruebas que cubra controllers, services y routes de forma pragmática.

## Estado Actual

- `test.js` está vacío.
- `test/` solo contiene `serviceAccountKey.json` (credenciales Firebase).
- `package.json` tiene Jest configurado pero sin utilidades de testing HTTP ni mocking de MongoDB.
- Los controllers tienen manejo de errores inconsistente (muchos retornan `res.status(400).json({ message: error })` con el objeto de error crudo).
- Muchas rutas tienen `verifyToken` comentado; la autenticación es JWT vía `middlewares/authUser.js`.
- Hay múltiples dependencias externas: Twilio, SendGrid, Monday.com, Puppeteer, Firebase, Cloudinary, Google Cloud Storage, y un servicio externo de PDFs (`PDF_SERVICE`).

## Enfoque Propuesto

### 1. Infraestructura de Testing (Fase 1)

**Herramientas a instalar:**
- `supertest` — para testear endpoints HTTP sin levantar el servidor.
- `mongodb-memory-server` — para tests de integración con una base MongoDB real en memoria (alternativa: `jest-mongodb`, pero `mongodb-memory-server` da más control).
- `@shelf/jest-mongodb` (opcional) — si se prefiere la configuración zero-config de Jest.

**Configuración de Jest:**
- Ajustar `jest.config.js` o la sección `jest` en `package.json` para:
  - `setupFilesAfterEnv: ['<rootDir>/test/setup.js']` — inicializa conexión a MongoDB en memoria y limpia colecciones entre tests.
  - `testMatch: ['**/__tests__/**/*.test.js']` o `test/**/*.test.js`.
  - `coveragePathIgnorePatterns: ['/node_modules/', '/test/fixtures/']`.

**Archivos a crear:**
- `test/setup.js` — conecta `mongodb-memory-server`, inicializa Mongoose, y expone helper de teardown.
- `test/fixtures/` — factories para crear documentos de prueba (User, Inventario, Flotilla, Flete, Traslado, Rentas, Paqueteria, etc.).
- `test/helpers/` — funciones reutilizables:
  - `generateToken(user)` — crea un JWT válido para rutas protegidas.
  - `mockExternalServices()` — reemplaza Twilio, SendGrid, Puppeteer, etc. con mocks de Jest.

### 2. Estrategia de Mocking

| Dependencia | Estrategia |
|---|---|
| **Mongoose / MongoDB** | `mongodb-memory-server` para tests de integración; `jest.spyOn(Model, 'find')` para unitarios de services. |
| **Twilio** | `jest.mock('twilio')` en `test/setup.js` o mock por test. |
| **SendGrid** | `jest.mock('@sendgrid/mail')` |
| **Monday.com (fetch)** | `jest.mock('node-fetch')` o `nock` |
| **Puppeteer** | `jest.mock('puppeteer')` — stub de `browser.newPage()` y `page.pdf()` |
| **Firebase** | `jest.mock('../database/firebase')` |
| **Cloudinary** | `jest.mock('../database/cloudinary')` |
| **Axios (PDF_SERVICE, EmailController)** | `jest.mock('axios')` o `nock` |
| **Google Cloud Storage (multer)** | Bypass en tests de integración; no subir archivos reales. |

### 3. Prioridad de Módulos a Testear

El orden propuesto va de menor dependencia externa a mayor, y de core a periférico:

**Nivel 1 — Unitarios puros (services sin I/O externo):**
1. `services/AlmacenService.js` — CRUD directo sobre `Inventarios`.
2. `services/UserService.js` — CRUD sobre `User` e `InvoiceStorage`.
3. `services/FamiliasService.js` — CRUD y agregaciones sobre `Familia`.
4. `services/Paqueteria.js` — CRUD sobre `Paqueteria`.
5. `services/AllFoliosService.js` — contadores simples.

**Nivel 2 — Controllers + routes (supertest + memoria):**
6. `controllers/AlmacenController.js` + `routes/almacenRoutes.js` — CRUD de inventario.
7. `controllers/UserController.js` + `routes/UserRoutes.js` — registro, login, JWT.
8. `controllers/ControlVHController.js` + `routes/ControlVHRoute.js` — CRUD simple.
9. `controllers/ChecaController.js` + `routes/ChecaRoutes.js` — asistencia y reportería Excel.
10. `controllers/RHController.js` + `routes/RHRoutes.js` — empleados y departamentos.

**Nivel 3 — Services con agregaciones complejas:**
11. `services/FlotillasService.js` — dynamic model selection (`traslado/flete/renta`).
12. `services/RHService.js` — agregaciones de `AttendanceEmployee` con lookups.
13. `services/CatalogoSerivice.js` — agregaciones y búsquedas de texto.
14. `services/MacbettyService.js` — agregaciones sobre `Mackbetty`.

**Nivel 4 — Controllers con dependencias externas (mocks heavy):**
15. `controllers/MessageController.js` + `routes/webRoutes.js` — Twilio, Monday.com, PDFs, Puppeteer, paquetería.
16. `controllers/FlotillasController.js` + `routes/FlotillasRoutes.js` — PDFs externos, vehículos, planes.
17. `controllers/EmailController.js` — MailerSend + axios a PDF_SERVICE.
18. `controllers/InventarioITController.js` + `routes/inventarioITRoutes.js` — Cloudinary, Firebase, Puppeteer (responsivas).

**Nivel 5 — Auth y middlewares:**
19. `middlewares/authUser.js` — `verifyToken` con JWT válido/inválido/expirado.

### 4. Estructura de Archivos de Prueba Propuesta

```
test/
├── setup.js              # Inicialización de mongodb-memory-server + mocks globales
├── fixtures/
│   ├── users.js          # factory de usuarios con bcrypt
│   ├── inventario.js     # factory de productos
│   ├── flotillas.js      # factories de Flotilla, Flete, Traslado, Rentas, Planes
│   ├── catalogo.js       # factories de Catalogo, Brand, Label, Familia
│   └── checa.js          # factories de ChecaEmployees, AttendanceEmployee, ChecaSites
├── helpers/
│   ├── auth.js           # generateToken(user), authHeader(token)
│   ├── mongo.js          # clearDatabase(), closeDatabase()
│   └── mocks.js          # setupExternalMocks()
├── unit/
│   ├── services/
│   │   ├── AlmacenService.test.js
│   │   ├── UserService.test.js
│   │   ├── FamiliasService.test.js
│   │   ├── Paqueteria.test.js
│   │   └── AllFoliosService.test.js
│   └── utils/
│       └── index.test.js   # comparePassword, createToken, dateFormat
├── integration/
│   ├── routes/
│   │   ├── almacenRoutes.test.js
│   │   ├── UserRoutes.test.js
│   │   ├── ControlVHRoute.test.js
│   │   ├── ChecaRoutes.test.js
│   │   ├── RHRoutes.test.js
│   │   ├── FlotillasRoutes.test.js
│   │   └── webRoutes.test.js
│   └── controllers/
│       ├── AlmacenController.test.js
│       ├── UserController.test.js
│       └── MessageController.test.js
└── coverage/
```

### 5. Patrones de Prueba por Capa

**Unit tests de services:**
- Mockear el modelo Mongoose (`jest.spyOn(Model, 'find').mockResolvedValue([...])`).
- Verificar que el service delega correctamente y transforma respuestas.
- No testear Mongoose en sí; testear la lógica del service (ej. `switch(type)` en `FlotillasService`).

**Integration tests de controllers/routes:**
- Usar `supertest(app)` donde `app` es la instancia Express sin llamar a `app.listen()`.
- Conectar a `mongodb-memory-server` antes de todos los tests del archivo.
- Limpiar todas las colecciones (`await Model.deleteMany()`) en `afterEach`.
- Para rutas con `verifyToken`, generar un token válido vía `createToken` y enviarlo en `Authorization: Bearer <token>`.
- Para rutas que suben archivos, usar `supertest.attach()` con un buffer pequeño.

**Tests de middlewares:**
- Pasar objetos `req`, `res`, `next` manualmente; verificar `res.status()` y `req.decoded`.

### 6. Casos Edge a Cubrir

- `FlotillasService.create/get` con `type` inválido o `undefined`.
- `FlotillasController.create` con `body` vacío o `type` faltante.
- `UserController.register` con `password !== confirmPassword`.
- `UserController.login` con credenciales inválidas.
- `ChecaController.registerEmployeeChecaApp` con QR inexistente.
- `MessageController.createInvoice` con Puppeteer mocked (verificar que se llama `page.pdf()`).
- `MessageController.paqueteria` con `sendNotification` mocked.
- Rutas protegidas sin token → `401`.
- Rutas protegidas con token inválido → `401`.

### 7. Scripts de package.json a agregar

```json
"scripts": {
  "test": "jest --verbose",
  "test:unit": "jest --verbose test/unit",
  "test:integration": "jest --verbose test/integration",
  "test:watch": "jest --watch",
  "test:coverage": "jest --coverage"
}
```

### 8. Plan de Ejecución (iterativo)

| Iteración | Entregable |
|---|---|
| **1** | Instalar dependencias (`supertest`, `mongodb-memory-server`, opcional `nock`). Crear `test/setup.js`, `test/helpers/`, `test/fixtures/`. |
| **2** | Tests unitarios de services del Nivel 1 (Almacen, User, Familias, Paqueteria, AllFolios). |
| **3** | Tests de integración de routes del Nivel 2 (Almacen, User, ControlVH, Checa, RH). |
| **4** | Tests unitarios de services del Nivel 3 (Flotillas, RH, Catalogo, Macbetty) + agregaciones. |
| **5** | Tests de integración de routes/controllers del Nivel 4 con mocks externos (Message, Flotillas, Email, InventarioIT). |
| **6** | Tests de middlewares (`authUser.js`) + cobertura global. |

### 9. Riesgos y Mitigaciones

| Riesgo | Mitigación |
|---|---|
| `server.js` conecta a MongoDB Atlas al importar `app` | En tests, importar solo `routes` y crear un `express()` de prueba, o mock `mongoose.connect` antes de importar `server.js`. |
| `imageStorage.js` escribe `gcpstorage.json` en disco | Mock `fs` o `multer-google-storage` en tests de integración que involucren upload. |
| Muchos controllers retornan `res.status(400).json({ message: error })` con objetos de error crudos | Los tests deben usar `expect.objectContaining` o verificar solo `statusCode`; no asumir estructura fija del body. |
| `Bussiness` model inline en `FlotillasService.js` | El mock debe funcionar a nivel de `mongoose.model` o testearse vía integración con memoria. |
| Variabilidad de `NODE_ENV` | Forzar `NODE_ENV=test` en `test/setup.js` y usar una URI de `mongodb-memory-server` en vez de `config/index.js`. |

---

## Pregunta al usuario

1. ¿Prefieres que los tests de integración usen **mongodb-memory-server** (más realista) o **mocks de Mongoose** (más rápidos)?
2. ¿Hay algún módulo que NO quieras testear (ej. `Macbetty`, `Monday.com`) porque está deprecado o poco usado?
3. ¿Quieres que también generemos un reporte de **cobertura de código** (`jest --coverage`) como parte del entregable?
