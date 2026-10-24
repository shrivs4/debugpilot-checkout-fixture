import { Coupon } from '../types/models';

/**
 * In-memory coupon store. In a real system this would be backed by a database;
 * here we seed a handful of coupons at startup and look them up by code.
 */
const coupons = new Map<string, Coupon>();

function seed(coupon: Coupon): void {
  coupons.set(coupon.code, coupon);
}

seed({ code: 'SAVE10', percentOff: 10 });
seed({ code: 'SAVE25', percentOff: 25 });

export function findCoupon(code: string): Coupon | undefined {
  return coupons.get(code);
}

export function addCoupon(coupon: Coupon): void {
  coupons.set(coupon.code, coupon);
}
