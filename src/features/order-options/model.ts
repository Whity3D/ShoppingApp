import { orderStore } from '../../entities/order/model';
import type { OrderOption } from '../../shared/types';

export class OrderOptionsManagement {
  availableOptions: OrderOption[] = [
    { id: '1', name: 'Leave at door' },
    { id: '2', name: 'Call on delivery' },
  ];

  toggleOption(option: OrderOption) {
    const exists = orderStore.options.find((o) => o.id === option.id);
    if (exists) {
      orderStore.removeOption(option.id);
    } else {
      orderStore.addOption(option);
    }
  }
}

export const orderOptionsManagement = new OrderOptionsManagement();
