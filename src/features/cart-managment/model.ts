import { reaction } from 'mobx';
import Toast from 'react-native-toast-message';
import { cartStore } from '../../entities/cart/model';
import { orderStore } from '../../entities/order/model';
import type { AnalyticsEvent, Product } from '../../shared/types';

export class CartManagement {
  analyticsEvents: AnalyticsEvent[] = [];

  constructor() {
    reaction(
      () => [cartStore.totalAmount, cartStore.items.length, orderStore.options.length],
      () => this.sendAnalytics(),
    );
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = cartStore.items.find((item) => item.product.id === product.id);
    if (existingItem) {
      cartStore.updateQuantity(product.id, existingItem.quantity + quantity);
    } else {
      cartStore.addItem(product, quantity);
    }
  }

  removeFromCart(productId: string) {
    const item = cartStore.items.find((item) => item.product.id === productId);
    if (item) {
      if (item.quantity > 1) {
        cartStore.updateQuantity(productId, item.quantity - 1);
      } else {
        cartStore.removeItem(productId);
      }
    }
  }

  async sendAnalytics() {
    const eventData = {
      cartItems: [...cartStore.items],
      options: [...orderStore.options],
      timestamp: Date.now(),
    };
    try {
      if (Math.random() < 0.2) throw new Error('Service unavailable');
      this.analyticsEvents.push({
        ...eventData,
        success: true,
      });
      Toast.show({
        type: 'success',
        text1: 'Analytics Sent',
        text2: 'Analytics data successfully sent to server',
      });
    } catch {
      this.analyticsEvents.push({
        ...eventData,
        success: false,
      });
      Toast.show({
        type: 'error',
        text1: 'Analytics Failed',
        text2: 'Failed to send analytics data: Service unavailable',
      });
    }
  }
}

export const cartManagement = new CartManagement();
