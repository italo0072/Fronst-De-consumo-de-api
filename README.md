# Frontend E-commerce (Next.js 16 + Laravel API)

Next.js App Router + TypeScript. Lecturas con Server Components, mutaciones con Server Actions, token en cookie httpOnly.

este es un proyecto de continuacion despues de aver creado nuestra api del siguiente repositor
[Proyecto de api](https://github.com/italo0072/API-E-commerce-con-Swagger)

## Ejecutar
```bash
npm install
cp .env.example .env.local   # ajusta API_BASE_URL
npm run dev                  # http://localhost:3000
# produccion (para Lighthouse)
npm run build && npm start
```
Requisitos: Node 20.9+ y la API Laravel corriendo.

## Variables (.env.example)
| Variable | Uso |
|---|---|
| API_BASE_URL | URL base de la API (solo servidor) |
| STRIPE_TEST_PM | payment_method de prueba enviado a `/orders/{id}/pay` |

## Endpoints de la API que consume
| Uso | Endpoint |
|---|---|
| Registro | POST /auth/register (name, email, password, password_confirmation) |
| Login | POST /auth/login → `data.access_token` (JWT) |
| Catalogo | GET /products, GET /products/{id} |
| Crear orden | POST /orders (items: product_id, quantity) |
| Pagar | POST /payments/create-intent y POST /payments/{order}/confirm |
| Historial | GET /orders |

Usuario demo del seeder: `cliente@demo.com` / `password123`.

## Rutas
| Ruta | Descripcion |
|---|---|
| / | Catalogo (Suspense) |
| /products/[id] | Detalle |
| /login, /register | Autenticacion |
| /checkout | Carrito, crear orden y pagar (protegida) |
| /checkout/success | Confirmacion |
| /orders | Historial (protegida, Suspense) |

## Decisiones
- Cookie httpOnly (`src/lib/session.ts`) y proteccion con `src/proxy.ts`.
- `revalidatePath` tras crear/pagar orden.
- `loading.tsx` y `error.tsx` en raiz, checkout y orders.
- Si `/pay` devuelve `url` (Stripe Checkout) se redirige; si no, va a la confirmacion.
