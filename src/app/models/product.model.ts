export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: any;
  images: Array<string>;
  createdAt: string;
  updatedAt: string;
  sale: any;
}
