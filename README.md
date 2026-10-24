# checkout-debug-poc

A small TypeScript/Node.js checkout domain. It supports building an order,
computing a subtotal, and checking out to a final total.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Domain

- `src/types/models.ts` – domain models (`Product`, `LineItem`, `Order`).
- `src/checkout/orderService.ts` – create orders, add items, compute subtotal.
- `src/checkout/checkoutService.ts` – turn an order into a final total.
- `src/logger.ts` – minimal structured logging.
