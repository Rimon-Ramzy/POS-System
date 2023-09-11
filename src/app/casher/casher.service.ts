import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Menu } from './menu/menu.model';
import { OrderMenu } from '../shared/models/order-menu.model';
import { Order } from '../shared/models/order.model';
import { Router } from '@angular/router';
import { Payments } from '../shared/models/payments.model';

@Injectable({
  providedIn: 'root'
})
export class CasherService {
  arrOfTablesChanged = new BehaviorSubject<number[]>([]);
  currentSelectedTable = new BehaviorSubject<number>(0);
  numberOfGuests = new BehaviorSubject<number>(0);
  isStoring = new BehaviorSubject<boolean>(false);

  arrOfMenu: any[] = [];
  arrOfMenuChanged = new BehaviorSubject<Menu[]>([]);

  tableOrder: [] = [];
  tableOrderChanged = new BehaviorSubject<[]>([]);
  arrOfTables: number[] = [];

  tableAllOrder: {} = {};
  tableAllOrderChanged = new BehaviorSubject<{}>({});

  orders: any = [];
  ordersChanged = new BehaviorSubject<[]>([]);


  arrOfOrders: any[] = [];
  newObjectOfOrderForCurrentTable: {} = {};

  newObjectOfOrderForCurrentTableChanged = new BehaviorSubject<{}>({});
  arrOfOrdersChanged = new BehaviorSubject<Menu[]>([]);

  arrOfNames: string[] = [];
  arrOfNamesChanged = new BehaviorSubject<string[]>([]);

  isEdit = new BehaviorSubject<boolean>(false);

  term = new BehaviorSubject<string>('');
  termCat = new BehaviorSubject<string>('');

  arrOfPayments: Payments[] = [];
  arrOfPaymentsChanged = new BehaviorSubject<Payments[]>([]);
  arrOfNamesPayments: string[] = [];
  arrOfNamesPaymentsChanged = new BehaviorSubject<string[]>([]);
  paymentsTotalPrice: number = 0;
  paymentsTotalPriceChanged = new BehaviorSubject<number>(0);
  paymentsPrice: number = 0;
  paymentsPriceChanged = new BehaviorSubject<number>(0);

  constructor() { }

  setArrOfTables(arrOfNewTables: number[]) {
    this.arrOfTables = arrOfNewTables;
    this.arrOfTablesChanged.next(this.arrOfTables.slice());
  }

  getArrOfTables() {
    return this.arrOfTables.slice();
  }

  addNewTable(newTable: number) {
    this.arrOfTables.push(newTable);
    this.arrOfTablesChanged.next(this.arrOfTables.slice());
  }

  removeTable(index: number) {
    this.arrOfTables.splice(index, 1)
    this.arrOfTablesChanged.next(this.arrOfTables);
    console.log(this.arrOfTables);
  }

  selectedNewTable(table: number) {
    this.currentSelectedTable.next(table);
  }
  selectedGuestsNum(guests: number) {
    this.numberOfGuests.next(Number(guests));
  }

  getArrOfTablesChanged() {
    return this.arrOfTablesChanged
  }

  setArrOfMenu(arrOfNewMenu: any[]) {
    this.arrOfMenu = arrOfNewMenu;
    this.arrOfMenuChanged.next(this.arrOfMenu.slice())
  }

  getArrOfMenu() {
    return this.arrOfMenu.slice();
  }

  getItemFromMenu(index: number) {
    return this.arrOfMenu[index];
  }

  addNewItemMenu(newItem: number) {
    this.arrOfMenu.push(newItem);
    this.arrOfMenuChanged.next(this.arrOfMenu.slice());
  }

  addItem(item: any) {
    this.arrOfMenu.push(item);
    this.arrOfMenuChanged.next(this.arrOfMenu.slice());
  }

  updateItem(index: number, item: Menu) {
    this.arrOfMenu[index] = item;
    this.arrOfMenuChanged.next(this.arrOfMenu.slice());
  }

  deleteItem(index: number) {
    this.arrOfMenu.splice(index, 1);
    this.arrOfMenuChanged.next(this.arrOfMenu.slice());
  }

  setArrOfOrders(arrOfOrders: Order[]) {
    if (arrOfOrders != null) {
      this.arrOfOrders = arrOfOrders;
      this.arrOfOrdersChanged.next(this.arrOfOrders.slice())
    }
  }

  // getArrOfOrders() {
  //   return this.arrOfOrders.slice();
  // }

  setOrderForCurrentTable(order: any) {
    this.newObjectOfOrderForCurrentTable = order;
    this.newObjectOfOrderForCurrentTableChanged.next(order);
    console.log(this.newObjectOfOrderForCurrentTable);

  }

  getOrderForCurrentTable() {
    return this.newObjectOfOrderForCurrentTable
  }

  addOrder(order: any) {
    this.arrOfOrders.push(order);
    this.arrOfOrdersChanged.next(this.arrOfOrders.slice());
  }

  getArrOfOrders() {
    return this.arrOfOrders;
  }

  ifUpdateOrder(order: any, mode: boolean) {
    this.isEdit.next(mode);
    this.newObjectOfOrderForCurrentTableChanged.next(order);
  }

  updateOrder(index: number, order: any) {
    this.arrOfOrders[index] = order;
    this.newObjectOfOrderForCurrentTableChanged.next(order);
  }

  deleteOrder(indexOfCurrentTable: number, index: number, tableOrder: any) {
    tableOrder.splice(index, 1);
    this.arrOfOrders[indexOfCurrentTable].orders = tableOrder;
    this.newObjectOfOrderForCurrentTableChanged.next(this.arrOfOrders[indexOfCurrentTable]);
  }

  deleteTableOrder(index: number) {
    console.log(index);
    console.log(this.arrOfOrders);
    this.arrOfOrders.splice(index, 1);
    console.log(this.arrOfOrders);
    this.arrOfOrdersChanged.next(this.arrOfOrders.slice());
  }


  setArrOfNames(arrOfNewNames: string[]) {
    this.arrOfNames = arrOfNewNames;
    this.arrOfNamesChanged.next(this.arrOfNames.slice());
  }
  getArrOfNames() {
    return this.arrOfNames.slice();
  }
  addNewName(newName: string) {
    console.log(newName);

    this.arrOfNames.push(newName);
    this.arrOfNamesChanged.next(this.arrOfNames.slice());
  }

  setArrOfPayments(paymentObj: Payments) {
    this.arrOfPayments.push(paymentObj);
    this.arrOfPaymentsChanged.next(this.arrOfPayments)
  }
  getArrOfPayments() {
    return this.arrOfPayments;
  }
  updateArrOfPayments(index: number, payment: Payments) {
    this.arrOfPayments[index] = payment;
    this.arrOfPaymentsChanged.next(this.arrOfPayments)
  }

  setArrOfNamesPayments(arrOfNewNames: any) {
    this.arrOfNamesPayments = arrOfNewNames;
    this.arrOfNamesPaymentsChanged.next(this.arrOfNamesPayments.slice());
  }
  getArrOfNamesPayments() {
    return this.arrOfNamesPayments.slice();
  }
  addNewNamePayments(newName: string) {
    this.arrOfNamesPayments.push(newName);
    this.arrOfNamesPaymentsChanged.next(this.arrOfNamesPayments.slice());
  }

  setPaymentsTotalPrice(paymentsTotalPrice: number) {
    this.paymentsTotalPrice += paymentsTotalPrice;
    this.paymentsTotalPriceChanged.next(this.paymentsTotalPrice)
  }
  getPaymentsTotalPrice() {
    return this.paymentsTotalPrice;
  }

  setPaymentsPrice(paymentsPrice: number) {
    this.paymentsPrice += paymentsPrice;
    this.paymentsPriceChanged.next(this.paymentsPrice)
  }
  getPaymentsPrice() {
    return this.paymentsPrice;
  }
}
