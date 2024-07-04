export interface Cart {
  items: Array<CartItem>
}

export interface CartItem {
  productImg: string;
  title: string;
  price: number;
  quantity: number;
  id: number;
  saleExist: boolean,
  newPrice: number,
}
