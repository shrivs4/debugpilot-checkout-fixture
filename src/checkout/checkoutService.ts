import { Order } from '../types/models';
import { calculateSubtotal } from './orderService';
import { logger } from '../logger';

/**
 * Checkout turns an order into a final, payable result. At this stage there are
 * no discounts: the total is simply the subtotal.
 */

export interface CheckoutResult {
  orderId: string;
  subtotal: number;
  total: number;
}

export function checkout(order: Order): CheckoutResult {
  logger.info('Starting checkout', { orderId: order.id, itemCount: order.items.length });

  const subtotal = calculateSubtotal(order);
  const total = subtotal;

  logger.info('Checkout complete', { orderId: order.id, subtotal, total });
  return { orderId: order.id, subtotal, total };
}
