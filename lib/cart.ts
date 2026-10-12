export interface CartItem {
  id: string; // product id
  slug: string;
  title: string;
  artistName?: string | null;
  department: string;
  category: string;
  productType: string;
  price: number; // in kobo
  currency: string;
  imageUrl: string;
  imageAlt: string;
  stock: number;
  shippingClass: string;
  quantity: number;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number; // in kobo
}

export function computeCartTotals(items: CartItem[]): CartTotals {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { itemCount, subtotal };
}
