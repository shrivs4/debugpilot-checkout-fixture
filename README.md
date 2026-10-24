# checkout-debug-poc

A small TypeScript/Node.js checkout domain. It supports building an order,
applying a coupon, computing a discount, and checking out to a final total.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

## Domain

- `src/types/models.ts` – domain models (`Product`, `LineItem`, `Coupon`, `Order`).
- `src/checkout/orderService.ts` – create orders, add items, compute subtotal.
- `src/checkout/discountService.ts` – turn a coupon into a discount amount.
- `src/checkout/checkoutService.ts` – apply a coupon and compute the final total.
- `src/coupons/couponRepository.ts` – in-memory coupon store.
- `src/logger.ts` – minimal structured logging.
