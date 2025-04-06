import { action, makeAutoObservable } from 'mobx';
import type { OrderOption } from '../../shared/types';

export class OrderStore {
  options: OrderOption[] = [];
  minOrderAmount = 1000;

  constructor() {
    makeAutoObservable(this, {
      resetOptions: action,
      addOption: action,
      removeOption: action,
    });
  }

  resetOptions() {
    this.options = [];
  }

  addOption(option: OrderOption) {
    this.options.push(option);
  }

  removeOption(optionId: string) {
    this.options = this.options.filter((o) => o.id !== optionId);
  }
}

export const orderStore = new OrderStore();
