/**
 * Scenario check: a customer builds a cart over several steps and checks out
 * with a percentage coupon. The expected figures below were worked out by hand
 * from the shelf prices.
 *
 * Run with:  npm run repro:scenario
 *
 * Exits non-zero if checkout disagrees with the expected figures.
 */
import { createOrder, addItem } from './checkout/orderService';
import { applyCoupon, checkout } from './checkout/checkoutService';
import { logger } from './logger';

const widget = { sku: 'A1', name: 'Widget', unitPrice: 20 };
const gadget = { sku: 'B2', name: 'Gadget', unitPrice: 5 };

const order = createOrder();
addItem(order, widget, 2);
addItem(order, gadget, 1);
addItem(order, widget, 3);
applyCoupon(order, 'SAVE10');

const result = checkout(order);

// 5 widgets x 20 + 1 gadget x 5 = 105; 10% off => 10.5; total 94.5
const expected = { subtotal: 105, discount: 10.5, total: 94.5 };

logger.info('Scenario checkout result', { result, expected });

const mismatches = (Object.keys(expected) as (keyof typeof expected)[]).filter(
  (key) => result[key] !== expected[key],
);

if (mismatches.length > 0) {
  logger.error('Scenario checkout produced unexpected totals', {
    orderId: result.orderId,
    mismatches: mismatches.map((key) => ({ field: key, expected: expected[key], actual: result[key] })),
  });
  process.exit(1);
}

logger.info('Scenario checkout matched expected totals');
