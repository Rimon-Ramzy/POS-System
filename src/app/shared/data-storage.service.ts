import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CasherService } from '../casher/casher.service';
import { map, tap } from 'rxjs';
import { Menu } from '../casher/menu/menu.model';
import { Payments } from './models/payments.model';
import { Order } from './models/order.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private _http: HttpClient, private chasherService: CasherService) { }

  storeTables() {
    const arrOfTables: number[] = this.chasherService.getArrOfTables();
    return this._http.put<number[]>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/table-num.json', arrOfTables)
  }

  fetchTables() {
    return this._http.get<number[]>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/table-num.json')
      .pipe(
        map((arrOfTables: number[]) => {
          return arrOfTables;
        }),
        tap((arrOfTables: number[]) => {
          this.chasherService.setArrOfTables(arrOfTables)
        })
      )
  }

  storeMenu() {
    const arrOfMenu: any[] = this.chasherService.getArrOfMenu();
    return this._http.put<Menu[]>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/menu.json', arrOfMenu)
  }

  fetchMenu() {
    return this._http.get('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/menu.json')
      .pipe(
        map((arrOfMenu: any) => {
          return arrOfMenu
        }),
        tap((arrOfMenu: any) => {
          this.chasherService.setArrOfMenu(arrOfMenu);
        })
      )
  }

  storeOrder() {
    const order: any[] = this.chasherService.getArrOfOrders();
    console.log(order);

    return this._http.put<Order[]>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/orders.json', order)
  }

  fetchOrder() {
    return this._http.get('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/orders.json')
      .pipe(
        map((arrOfOrders: any) => {
          return arrOfOrders
        }),
        tap((arrOfOrders: any) => {
          this.chasherService.setArrOfOrders(arrOfOrders);
        })
      )
  }

  storePayments() {
    const payments: any[] = this.chasherService.getArrOfPayments();
    return this._http.put<Payments>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/payments.json', payments)
  }

  fetchPayments() {
    return this._http.get('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/payments.json')
      .pipe(
        map((arrOfPayments: any) => {
          return arrOfPayments
        }),
        tap((arrOfPayments: any) => {
          arrOfPayments?.map(
            (res: any) => {
              this.chasherService.setArrOfPayments(res);
            }
          )
        })
      )
  }

  storePaymentsPrice() {
    const paymentsPrice: number = this.chasherService.getPaymentsPrice();
    return this._http.put<number>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/payments-price.json', paymentsPrice)
  }

  fetchPaymentsPrice() {
    return this._http.get('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/payments-price.json')
      .pipe(
        map((paymentsPrice: any) => {
          return paymentsPrice
        }),
        tap((paymentsPrice: any) => {
          this.chasherService.setPaymentsPrice(paymentsPrice);
        })
      )
  }

  storePaymentsTotalPrice() {
    const paymentsTotalPrice: number = this.chasherService.getPaymentsTotalPrice();
    return this._http.put<number>('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/payments-totalprice.json', paymentsTotalPrice)
  }

  fetchPaymentsTotalPrice() {
    return this._http.get('https://fir-angular-cb0aa-default-rtdb.firebaseio.com/payments-totalprice.json')
      .pipe(
        map((paymentsTotalPrice: any) => {
          return paymentsTotalPrice
        }),
        tap((paymentsTotalPrice: any) => {
          this.chasherService.setPaymentsTotalPrice(paymentsTotalPrice);
        })
      )
  }
}
