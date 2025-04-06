export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderOption {
  id: string;
  name: string;
}

export interface AnalyticsEvent {
  cartItems: CartItem[];
  options: OrderOption[];
  timestamp: number;
  success: boolean;
}

export type RootStackParamsList = {
  Catalog: undefined;
  Cart: undefined;
};
