import { describe, it, expect } from 'vitest';
import { calculateDiscount } from '../src/checkout/discountService';

describe('calculateDiscount', () => {
  it('applies a percentage discount', () => {
    expect(calculateDiscount(100, { code: 'SAVE10', percentOff: 10 })).toBe(10);
  });

  it('scales with the subtotal', () => {
    expect(calculateDiscount(200, { code: 'SAVE25', percentOff: 25 })).toBe(50);
  });
});
