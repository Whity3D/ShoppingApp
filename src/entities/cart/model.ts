import { action, makeAutoObservable } from 'mobx';
import type { CartItem, Product } from '../../shared/types';

export class CartStore {
  items: CartItem[] = [];

  constructor() {
    makeAutoObservable(this, {
      addItem: action,
      removeItem: action,
      updateQuantity: action,
      resetItems: action,
    });
  }

  addItem(product: Product, quantity: number = 1) {
    this.items.push({ product, quantity });
  }

  removeItem(productId: string) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  }

  updateQuantity(productId: string, quantity: number) {
    const item = this.items.find((item) => item.product.id === productId);
    if (item) {
      item.quantity = quantity;
    }
  }

  resetItems() {
    this.items = [];
  }

  get totalAmount() {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }
}

export const cartStore = new CartStore();
