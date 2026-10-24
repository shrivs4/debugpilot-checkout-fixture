import { describe, it, expect } from 'vitest';
import { createOrder, addItem } from '../src/checkout/orderService';
import { checkout } from '../src/checkout/checkoutService';

describe('checkout without coupons', () => {
  it('totals the subtotal of all line items', () => {
    const order = createOrder();
    addItem(order, { sku: 'A1', name: 'Widget', unitPrice: 20 }, 2);
    addItem(order, { sku: 'B2', name: 'Gadget', unitPrice: 5 }, 1);

    const result = checkout(order);

    expect(result.subtotal).toBe(45);
    expect(result.total).toBe(45);
  });
});
