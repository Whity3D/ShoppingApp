import { cartStore } from '../../entities/cart/model';
import { orderStore } from '../../entities/order/model';

export class OrderSummary {
  async submitOrder(): Promise<{ success: boolean; error?: string }> {
    try {
      const random = Math.random();
      if (random < 0.1) throw new Error('Service unavailable');
      if (cartStore.totalAmount < orderStore.minOrderAmount) {
        throw new Error('Minimum order amount not reached');
      }
      const outOfStock = cartStore.items.find((item) => item.quantity > item.product.stock);
      if (outOfStock) throw new Error(`Not enough ${outOfStock.product.name} in stock`);
      return { success: true };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      return { success: false, error: errorMessage };
    }
  }
}

export const orderSummary = new OrderSummary();
