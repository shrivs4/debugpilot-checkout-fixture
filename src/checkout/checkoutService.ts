import { Order } from '../types/models';
import { calculateSubtotal } from './orderService';
import { calculateDiscount } from './discountService';
import { findCoupon } from '../coupons/couponRepository';
import { logger } from '../logger';

/**
 * Checkout turns an order into a final, payable result. A coupon may be applied
 * to the order; if present, its discount is subtracted from the subtotal.
 */

export interface CheckoutResult {
  orderId: string;
  subtotal: number;
  discount: number;
  total: number;
}

export function applyCoupon(order: Order, code: string): Order {
  const coupon = findCoupon(code);
  if (!coupon) {
    logger.warn('Coupon not found', { orderId: order.id, code });
    throw new Error(`Unknown coupon: ${code}`);
  }

  order.coupon = coupon;
  logger.info('Applied coupon to order', { orderId: order.id, code });
  return order;
}

export function checkout(order: Order): CheckoutResult {
  logger.info('Starting checkout', { orderId: order.id, itemCount: order.items.length });

  const subtotal = calculateSubtotal(order);

  let discount = 0;
  if (order.coupon) {
    discount = calculateDiscount(subtotal, order.coupon);
  }

  const total = subtotal - discount;

  logger.info('Checkout complete', { orderId: order.id, subtotal, discount, total });
  return { orderId: order.id, subtotal, discount, total };
}
