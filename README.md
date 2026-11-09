# checkout-debug-poc

A small TypeScript/Node.js checkout domain used as a deliberately buggy
codebase for an AI debugging-assistant proof of concept. It supports building
an order, applying a coupon, computing a discount, and checking out to a final
total.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

The suite covers both post-migration coupons (with a `discountType`) and legacy
coupons created before the October 2026 migration.

## Legacy coupons

```bash
npm run repro:legacy
```

Coupons created before the October 2026 migration have no `discountType`. They
were all percentage-off coupons, so `calculateDiscount` treats a missing
`discountType` as `PERCENTAGE`. `src/reproduceLegacyBug.ts` checks out an order
with such a coupon and verifies the resulting totals.

## Domain

- `src/types/models.ts` – domain models (`Product`, `LineItem`, `Coupon`, `Order`).
- `src/checkout/orderService.ts` – create orders, add items, compute subtotal.
- `src/checkout/discountService.ts` – turn a coupon into a discount amount.
- `src/checkout/checkoutService.ts` – apply a coupon and compute the final total.
- `src/coupons/couponRepository.ts` – in-memory coupon store.
- `src/logger.ts` – minimal structured logging.
- `src/reproduceLegacyBug.ts` – legacy-coupon checkout check.
