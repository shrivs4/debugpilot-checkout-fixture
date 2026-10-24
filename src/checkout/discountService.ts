import { Coupon } from '../types/models';
import { logger } from '../logger';

/**
 * Translate a coupon into an absolute discount amount for a given subtotal.
 *
 * At this stage every coupon is a simple percentage-off coupon.
 */
export function calculateDiscount(subtotal: number, coupon: Coupon): number {
  logger.info('Calculating discount', { code: coupon.code, subtotal });

  const discount = subtotal * (coupon.percentOff / 100);

  logger.info('Discount calculated', { code: coupon.code, discount });
  return discount;
}
