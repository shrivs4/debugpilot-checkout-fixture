import { Coupon } from '../types/models';
import { logger } from '../logger';

/**
 * Translate a coupon into an absolute discount amount for a given subtotal.
 *
 * Coupons can be either PERCENTAGE or FIXED. The discount type was introduced
 * in the October 2026 migration; every coupon written after the migration
 * carries a `discountType`.
 */
export function calculateDiscount(subtotal: number, coupon: Coupon): number {
  logger.info('Calculating discount', { code: coupon.code, subtotal });

  // NOTE: this assumes every coupon has a discountType. Coupons created before
  // the migration do not, so this line throws for legacy data.
  const normalizedType = coupon.discountType.toUpperCase();

  let discount: number;
  if (normalizedType === 'PERCENTAGE') {
    discount = subtotal * (coupon.amount / 100);
  } else {
    discount = Math.min(coupon.amount, subtotal);
  }

  logger.info('Discount calculated', { code: coupon.code, type: normalizedType, discount });
  return discount;
}
