import { makeAutoObservable } from 'mobx';
import type { Product } from '../../shared/types';

export class ProductStore {
  products: Product[] = Array.from({ length: 1000 }, (_, i) => ({
    id: `${i}`,
    name: `Product ${i}`,
    price: Math.floor(Math.random() * 1000) + 100,
    stock: Math.floor(Math.random() * 10) + 1,
  }));

  constructor() {
    makeAutoObservable(this);
  }
}

export const productStore = new ProductStore();
