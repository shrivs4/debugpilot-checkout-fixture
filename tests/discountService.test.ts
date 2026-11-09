import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../src/checkout/discountService';
import { Coupon } from '../src/types/models';

describe('calculateDiscount', () => {
  it('applies a percentage discount', () => {
    expect(
      calculateDiscount(100, { code: 'SAVE10', discountType: 'PERCENTAGE', amount: 10 }),
    ).toBe(10);
  });

  it('applies a fixed discount', () => {
    expect(
      calculateDiscount(100, { code: 'FLAT15', discountType: 'FIXED', amount: 15 }),
    ).toBe(15);
  });

  it('never discounts more than the subtotal for fixed coupons', () => {
    expect(
      calculateDiscount(10, { code: 'FLAT15', discountType: 'FIXED', amount: 15 }),
    ).toBe(10);
  });

  it('treats a legacy coupon without a discountType as a percentage coupon', () => {
    const legacyCoupon = { code: 'LEGACY20', amount: 20 } as unknown as Coupon;
    expect(calculateDiscount(100, legacyCoupon)).toBe(20);
  });
});
