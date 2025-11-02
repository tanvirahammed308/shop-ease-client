export interface Product {
  _id: string;
  name: string;
  price: number;
  photos?: string[];
  description?: string;
  stock?: number;
}

export interface CartItem {
  _id?: string; // cart item id
  productId: string; // Always string from API
  product?: Product; // populated product (optional)
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

export interface Cart {
  _id?: string;
  user?: string;
  items: CartItem[];
}

export interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
  success: string | null;
}

export interface AddToCartPayload {
  productId: string;
  name: string;
  price: number;
  photos: string;
  quantity: number;
}