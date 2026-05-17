# ITX Mobile Shop — Prueba tecnica Frontend ITX

SPA de catálogo de dispositivos móviles (PLP + PDP) con React, TypeScript y Vite.

## Requisitos

- Node.js 18+ recomendado (mínimo 16 con Vite 5)
- npm 8+
## Requisitos
He añadido 
## Scripts

| Script | Descripcion |
|--------|-------------|
| `npm install` | Instalacion |
| `npm start` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm test` | Tests unitarios (Vitest) |
| `npm run lint` | ESLint |

http://localhost:5173

## Arquitectura

```
src/
├── app/           # Router, providers, DI container
├── pages/         # PLP, PDP (vistas)
├── features/      # Dominio: products, cart
│   ├── products/  # Repositorios, hooks, utilidades
│   └── cart/      # API cesta, contexto, persistencia
└── shared/        # Componentes UI, cache, HTTP, tipos
```

### Principios aplicados

- **SRP**: cada clase/componente con una responsabilidad (p. ej. `CachedProductRepository` solo cachea; `ProductApiRepository` solo llama al API).
- **DIP**: hooks y UI dependen de interfaces (`IProductRepository`, `ICartRepository`), no de implementaciones concretas.
- **OCP**: el cache se extiende decorando el repositorio sin modificar el cliente HTTP.
- **Cache**: `localStorage` con TTL de 1 hora (`CachedFetcher` + `LocalStorageCache`).
- **Carrito**: contador persistido en `localStorage`; se actualiza tras cada `POST /api/cart`.

### API

| Método | Ruta | Uso |
|--------|------|-----|
| GET | `/api/product` | Listado PLP |
| GET | `/api/product/:id` | Detalle PDP |
| POST | `/api/cart` | Body: `{ id, colorCode, storageCode }` → `{ count }` |

## Rutas

- `/` — Listado con búsqueda en tiempo real (marca/modelo)
- `/product/:id` — Detalle, selectores y añadir a cesta
