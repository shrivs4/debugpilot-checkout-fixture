import { LineItem, Order, Product } from '../types/models';
import { logger } from '../logger';

/**
 * Order lifecycle: creating an order (a cart), adding items, and computing the
 * raw subtotal before any discounts are applied.
 */

let orderCounter = 0;

export function createOrder(): Order {
  const id = `order-${++orderCounter}`;
  logger.info('Created new order', { orderId: id });
  return { id, items: [] };
}

/**
 * Add a product to the order. Each SKU appears on at most one line item, so
 * adding a product that is already in the order updates its existing line.
 */
export function addItem(order: Order, product: Product, quantity: number): Order {
  const existing = order.items.find((item) => item.product.sku === product.sku);
  if (existing) {
    existing.quantity = quantity;
  } else {
    order.items.push({ product, quantity });
  }
  logger.info('Added item to order', { orderId: order.id, sku: product.sku, quantity });
  return order;
}

export function calculateSubtotal(order: Order): number {
  return order.items.reduce(
    (sum: number, item: LineItem) => sum + item.product.unitPrice * item.quantity,
    0,
  );
}
