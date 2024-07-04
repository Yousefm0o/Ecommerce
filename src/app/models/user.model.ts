import { CartItem } from './cart.model'

export interface User {
  fName: string,
  lName: string,
  userName: string,
  phoneNumber: string,
  pic: string,
  orders: Array<order>,
  paymentHistory: Array<Payment>
}

export interface order {
  id: number,
  date: string,
  status: string,
  items: Array<CartItem>,
  totalPrice: number,
  address: string,
  city: string,
  state: string,
  paymentMethod: string,
}

export interface Payment {
  count: number,
  cost: number,
  date: string
}
