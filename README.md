# checkout-debug-poc

A small TypeScript/Node.js checkout domain used as a deliberately buggy
codebase for an AI debugging-assistant proof of concept. It supports building
an order, applying a coupon, computing a discount, and checking out to a final
total.

> This project contains **one intentional bug**. See
> [The intentional bug](#the-intentional-bug) below. Do not "fix" it — it is
> the subject of the POC.

## Install

```bash
npm install
```

## Test

```bash
npm test
```

The test suite passes: it only exercises coupons created after the October 2026
migration (i.e. coupons that have a `discountType`).

## Reproduce the bug

```bash
npm run repro:legacy
```

This runs `src/reproduceLegacyBug.ts`, which checks out an order using a
*legacy* coupon (one with no `discountType`). It crashes with a `TypeError`
whose stack trace points at `src/checkout/discountService.ts`.

## The intentional bug

- New coupons carry a `discountType` field (`'PERCENTAGE' | 'FIXED'`), added in
  the October 2026 migration.
- Legacy coupons — created before the migration — do **not** have a
  `discountType`.
- `calculateDiscount` in `src/checkout/discountService.ts` assumes the field
  always exists and calls `coupon.discountType.toUpperCase()`.
- For a legacy coupon, `coupon.discountType` is `undefined`, so that line throws
  `TypeError: Cannot read properties of undefined (reading 'toUpperCase')`.

The normal tests pass because they only cover new coupons. The regression was
introduced alongside the `discountType` change (see the Git history).

## Domain

- `src/types/models.ts` – domain models (`Product`, `LineItem`, `Coupon`, `Order`).
- `src/checkout/orderService.ts` – create orders, add items, compute subtotal.
- `src/checkout/discountService.ts` – turn a coupon into a discount amount.
- `src/checkout/checkoutService.ts` – apply a coupon and compute the final total.
- `src/coupons/couponRepository.ts` – in-memory coupon store.
- `src/logger.ts` – minimal structured logging.
- `src/reproduceLegacyBug.ts` – reproduction script for the legacy-coupon bug.
