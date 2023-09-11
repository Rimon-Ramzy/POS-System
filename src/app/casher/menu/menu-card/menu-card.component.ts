import { Component, OnInit, ViewChild } from '@angular/core';
import { CasherService } from '../../casher.service';
import { Menu } from '../menu.model';
import { NgForm } from '@angular/forms';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';
import { Order } from 'src/app/shared/models/order.model';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.scss']
})



export class MenuCardComponent implements OnInit {
  @ViewChild('quantityForm') quantityForm!: NgForm;
  arrOfMenu: Menu[] = [];
  itemQuantity!: any;
  currentSelectedTable!: number;
  numberOfGuests!: number;
  price!: number;
  servicePrice!: number;
  totalPrice!: number;
  validationQuantity: boolean = false;

  OrderMenu: OrderMenu[] = [];
  arrOfNames: string[] = [];

  activeSubmitButton: boolean = false;
  olderTableOrder: any;

  indexOfCurrentTable!: number;

  term: string = '';
  termCat: string = '';

  constructor(private casherService: CasherService) { }

  ngOnInit(): void {
    this.casherService.arrOfMenuChanged.subscribe(
      (response: any) => {
        this.arrOfMenu = response;
      }
    );
    this.casherService.currentSelectedTable.subscribe(
      (response: number) => {
        this.currentSelectedTable = response;
      }
    )
    this.casherService.numberOfGuests.subscribe(
      (response: number) => {
        this.numberOfGuests = response;
      }
    )
    this.olderTableOrder = this.casherService.getArrOfOrders();
    this.casherService.newObjectOfOrderForCurrentTableChanged.subscribe(
      (res: any) => {
        this.OrderMenu = res.orders;
      }
    )
    if (this.OrderMenu?.length != 0) {
      this.OrderMenu?.map(
        (res: any) => {
          this.arrOfNames.push(res.name);
        }
      )
    }

    this.casherService.term.subscribe(
      (res: string) => {
        this.term = res;
      }
    )

    this.casherService.termCat.subscribe(
      (res: string) => {
        if (res == 'All Categories') {
          this.termCat = '';
        } else {
          this.termCat = res;
        }
      }
    )
  }

  onAddItemToOrder(item: any) {
    const orderObj = {
      name: item.name,
      category: item.category,
      image: item.image,
      quantity: this.itemQuantity,
      price: item.price,
      totalPrice: item.price * this.itemQuantity
    };
    const orderMenuObj = new OrderMenu(orderObj.name, orderObj.category, orderObj.image, orderObj.quantity, orderObj.price, orderObj.totalPrice);
    console.log(orderMenuObj);

    if (!this.casherService.getArrOfNames().includes(item.name)) {
      this.casherService.addNewName(item.name);
      this.OrderMenu.push(orderMenuObj);
    } else {
      this.OrderMenu.map(
        (orderItem: any) => {
          if (orderItem.name == item.name) {
            orderItem.quantity = orderItem.quantity + this.itemQuantity;
            orderItem.totalPrice = item.price * orderItem.quantity
          }
        }
      )
    }
    const arrOfPrice: any[] = [];
    let sum: number = 0;
    for (let i = 0; i < this.OrderMenu.length; i++) {
      arrOfPrice.push(this.OrderMenu[i].price * this.OrderMenu[i].quantity);
    }

    for (let i = 0; i < arrOfPrice.length; i++) {
      sum += arrOfPrice[i];
    }
    this.price = sum;
    this.servicePrice = this.price * (10 / 100);
    this.totalPrice = this.price + this.servicePrice;

    const allOrder = {
      table: this.currentSelectedTable,
      guest: this.numberOfGuests,
      orders: {},
      price: this.price,
      servicePrice: this.servicePrice,
      totalPrice: this.totalPrice,
      isPayed: false
    }
    allOrder['orders'] = this.OrderMenu;
    this.activeSubmitButton = true;
    console.log(allOrder);
    this.casherService.setOrderForCurrentTable(allOrder);
    console.log(allOrder);

    // this.casherService.addOrder


    this.casherService.isEdit.subscribe(
      (res: boolean) => {
        console.log(res);
        if (res) {
          console.log(this.getTableOrderIndex());
          console.log("edit");
          this.casherService.updateOrder(this.getTableOrderIndex(), allOrder)
        } else {
          console.log("submit");
          this.casherService.newObjectOfOrderForCurrentTableChanged.next(allOrder);
        }
      }
    )
    console.log(this.casherService.getArrOfOrders());
    this.itemQuantity = '';
  }

  onItemMouseLeave() {
    this.itemQuantity = undefined;
  }

  onKeyUp() {
    const regexLiteral = /^[1-9][0-9]*$/gm;
    const isMatch = regexLiteral.test(this.itemQuantity);
    this.validationQuantity = isMatch
    if (this.itemQuantity == null) {
      this.itemQuantity = undefined
    }
  }

  getTableOrderIndex(): any {
    // let indexOfCurrentTable!: number;
    for (let i = 0; i < this.casherService.getArrOfOrders().length; i++) {
      if (this.casherService.getArrOfOrders()[i].table === this.currentSelectedTable) {
        return this.indexOfCurrentTable = Number(i);
      }
    }
  }
}
