import { OrderMenu } from "./order-menu.model";

export class Order {
  orders: any;
  constructor(
    public table: number,
    public guest: number,
    public order: OrderMenu[],
    public price: number,
    public servicePrice: number,
    public totalPrice: number,
    public isPayed: boolean
  ) { }

}
