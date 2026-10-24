/**
 * Core domain models for the checkout system.
 *
 * The domain is intentionally small: a customer builds up an {@link Order} out
 * of {@link LineItem}s, optionally applies a {@link Coupon}, and then "checks
 * out" to obtain a final total.
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

/**
 * How a coupon's {@link Coupon.amount} should be interpreted.
 *
 * Added in the October 2026 coupon migration so that we could support fixed
 * dollar-off coupons in addition to the original percentage coupons.
 */
export type DiscountType = 'PERCENTAGE' | 'FIXED';

export interface Coupon {
  code: string;
  /**
   * Discount type. Every coupon written *after* the migration carries this.
   * Coupons created before the migration ("legacy" coupons) do not.
   */
  discountType: DiscountType;
  /**
   * For PERCENTAGE coupons this is a percentage (10 => 10% off).
   * For FIXED coupons this is an absolute amount off the subtotal.
   */
  amount: number;
}

export interface Order {
  id: string;
  items: LineItem[];
  coupon?: Coupon;
}
