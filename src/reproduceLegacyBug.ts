/**
 * Reproduction script for the legacy-coupon regression.
 *
 * Background: before the October 2026 migration, coupons were stored without a
 * `discountType`. The migration added `discountType` and `calculateDiscount`
 * was updated to read it. Coupons written before the migration ("legacy"
 * coupons) still lack the field, so running one through checkout throws inside
 * the discount-calculation path.
 *
 * Run with:  npm run repro:legacy
 *
 * Originally this crashed with a TypeError in calculateDiscount. Legacy coupons
 * are now treated as percentage coupons, so the script checks the expected
 * totals and exits non-zero if they are wrong.
 */
import { Coupon } from './types/models';
import { addCoupon } from './coupons/couponRepository';
import { createOrder, addItem } from './checkout/orderService';
import { applyCoupon, checkout } from './checkout/checkoutService';
import { logger } from './logger';

// A coupon as it existed in the store *before* discountType was added. We cast
// through `unknown` to mimic loading a legacy row the current types no longer
// describe (code + amount only, no discountType).
const legacyCoupon = { code: 'LEGACY20', amount: 20 } as unknown as Coupon;
addCoupon(legacyCoupon);

logger.info('Reproducing legacy-coupon checkout', { code: legacyCoupon.code });

const order = createOrder();
addItem(order, { sku: 'A1', name: 'Widget', unitPrice: 100 }, 1);
applyCoupon(order, 'LEGACY20');

const result = checkout(order);

logger.info('Checkout result', { result });

if (result.discount !== 20 || result.total !== 80) {
  logger.error('Legacy coupon produced unexpected totals', { result, expectedDiscount: 20, expectedTotal: 80 });
  process.exit(1);
}
