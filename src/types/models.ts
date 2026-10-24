/**
 * Core domain models for the checkout system.
 *
 * The domain is intentionally small: a customer builds up an {@link Order} out
 * of {@link LineItem}s and then "checks out" to obtain a final total.
 */

export interface Product {
  sku: string;
  name: string;
  /** Unit price in whole currency units (e.g. dollars). */
  unitPrice: number;
}

export interface LineItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: LineItem[];
}
