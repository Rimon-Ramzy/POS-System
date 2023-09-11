import { Component, OnInit } from '@angular/core';
import { CasherService } from 'src/app/casher/casher.service';
import { OrderMenu } from '../models/order-menu.model';
import { Order } from '../models/order.model';
import { DataStorageService } from '../data-storage.service';
import { BehaviorSubject, finalize, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  allOrders: Order[] = [];
  currentSelectedTable!: number;
  numberOfGuests!: number;
  tableOrder: OrderMenu[] = [];
  price!: number;
  servicePrice!: number;
  totalPrice!: number;
  hideDelete: boolean = false;
  showCancelBtn: boolean = false;
  isEdit: boolean = false;
  isEditChanged = new BehaviorSubject<boolean>(false);
  showUpdateBtnChanged = new BehaviorSubject<boolean>(false);
  showUpdateBtn: boolean = false;


  currentTableOrdersUpdated!: Order;
  currentTableOrders!: Order;
  indexOfCurrentTable!: number;

  tableOrders: any = [];
  clickOnDeleteOrder: boolean = false;

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService, private _router: Router) {

  }

  ngOnInit(): void {
    this.getTableOrderIndex();
    this.getTableDetails();
    this.allOrders = this.casherService.getArrOfOrders();

    this.onControlInOldOrder();
    this.hideDelete = this._router.url == '/home';

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

    this.currentTableOrders = this.allOrders[this.getTableOrderIndex()]
    if (!this.isEdit && this.currentTableOrders !== undefined) {
      this.showCancelBtn = true;
    }


    if (this.isEdit) {
      this.showCancelBtn = true;
      this.casherService.newObjectOfOrderForCurrentTableChanged.subscribe(
        (res: any) => {
          if (this.currentTableOrders != undefined) {
            if (this.currentTableOrders != res) {
              this.showUpdateBtnChanged.next(true);
            } else {
              this.showUpdateBtnChanged.next(false);
            }
          }
        }
      )
    } else {
      this.showUpdateBtnChanged.next(false);
      this.showCancelBtn = false;
      this.casherService.newObjectOfOrderForCurrentTableChanged.subscribe(
        (res: any) => {
          if (res.orders?.length == 0 || res.orders?.length == undefined) {
            this.showUpdateBtnChanged.next(false);
          } else {
            this.showUpdateBtnChanged.next(true);
          }
        }
      )
    }
  }

  getTableDetails() {
    this.casherService.newObjectOfOrderForCurrentTableChanged.subscribe(
      (response: any) => {
        if (Object.keys(response).length !== 0) {
          this.tableOrder = response.orders
          this.price = response.price;
          this.servicePrice = response.servicePrice;
          this.totalPrice = response.totalPrice;
        }
      }
    )
  }

  onControlInOldOrder() {
    this.casherService.isEdit.subscribe(
      (res: boolean) => {
        this.isEdit = res;
      }
    )
  }

  onSubmitOrder(): any {
    if (this.isEdit == false) {
      console.log("submit");

      // this.casherService.isStoring.next(true);
      this.casherService.newObjectOfOrderForCurrentTableChanged.subscribe(
        (res: any) => {
          // if (!this.clickOnDeleteOrder) {
          // this.tableOrder = res.orders;
          // this.casherService.addOrder(res);
          // }
          this.tableOrder = res.orders;
          this.casherService.addOrder(res);
          console.log(res);
        }
      )

      return this.dataStorageService.storeOrder()
        .pipe(
          finalize(() => {
            this.casherService.isStoring.next(false);
          })
        )
        .subscribe(
          (res: any) => {
            this.showUpdateBtnChanged.next(true);
            this._router.navigate(['/home'])
              .then(() => {
                window.location.reload();
              });
          }
        );
    }
    else {
      console.log("edit");

      this.casherService.newObjectOfOrderForCurrentTableChanged.subscribe(
        (res: any) => {
        }
      )
      this.casherService.isStoring.next(true);
      const currentOrder = this.updatePrices(this.allOrders, this.getTableOrderIndex())

      this.casherService.setOrderForCurrentTable(currentOrder);
      this.allOrders[this.getTableOrderIndex()] = currentOrder;
      this.casherService.updateOrder(this.getTableOrderIndex(), this.allOrders[this.getTableOrderIndex()]);
      return this.dataStorageService.storeOrder().pipe(
        finalize(() => {
          this.casherService.isStoring.next(false);
        })
      ).subscribe()
    }
  }

  goToUpdate() {
    this._router.navigate(['/menu']);
  }

  onDeleteOrder(index: any, order: any) {
    this.clickOnDeleteOrder = true;
    console.log(this.getTableOrderIndex());
    if (this.getTableOrderIndex() == undefined) {
      console.log("undef");

      this.casherService.newObjectOfOrderForCurrentTableChanged
        // .pipe(
        //   switchMap(() => {
        //     console.log("asdd");
        //     return "sad"
        //   })
        // )
        .subscribe(
          (res: any) => {
            this.tableOrders = res;
            this.tableOrder = res.orders;
            console.log(res.orders);
            // res.price= res.price - (res.orders[index].price * res.orders[index].quantity);
            // res.price = res.price - (res.orders[index].price * res.orders[index].quantity);
            // res.servicePrice = res.price * (10 / 100);
            // res.totalPrice = res.price + (res.price * (10 / 100));
            // res.orders.splice(index, 1)
            console.log(res);
            return this.tableOrders;
            // this.casherService.newObjectOfOrderForCurrentTableChanged.next(this.tableOrder);
          }
        )
      const newTableOrder =
      {
        table: this.tableOrders.table,
        guest: this.tableOrders.guest,
        orders: this.tableOrders.orders,
        price: this.tableOrders.price - (this.tableOrders.orders[index].price * this.tableOrders.orders[index].quantity),
        servicePrice: (this.tableOrders.price - (this.tableOrders.orders[index].price * this.tableOrders.orders[index].quantity)) * (10 / 100),
        totalPrice: (this.tableOrders.price - (this.tableOrders.orders[index].price * this.tableOrders.orders[index].quantity)) + ((this.tableOrders.price - (this.tableOrders.orders[index].price * this.tableOrders.orders[index].quantity)) * (10 / 100)),
      };
      newTableOrder.orders.splice(index, 1)
      console.log(newTableOrder);

      this.casherService.newObjectOfOrderForCurrentTableChanged.next(newTableOrder);
      // this.x(this.tableOrders);
      // this.casherService.addOrder(this.tableOrders);
      // this.casherService.setOrderForCurrentTable(this.tableOrder);
    } else {
      this.casherService.deleteOrder(this.getTableOrderIndex(), index, this.tableOrder);
      const currentOrder = this.updatePrices(this.allOrders, this.getTableOrderIndex());
      this.casherService.setOrderForCurrentTable(currentOrder);
    }
    const newArrOfNames = this.casherService.getArrOfNames().filter(item => item !== order.name);
    this.casherService.setArrOfNames(newArrOfNames);
    this.showUpdateBtnChanged.next(true);
  }

  x(response: any) {
    console.log(response);

  }
  updatePrices(allOrders: any, indexOfCurrentTable: number) {
    const currentOrderMenu = allOrders[indexOfCurrentTable].orders
    const currentOrder = allOrders[indexOfCurrentTable]
    const arrOfPrice: any[] = [];
    let sum: number = 0;
    for (let i = 0; i < currentOrderMenu.length; i++) {
      arrOfPrice.push(currentOrderMenu[i].price * currentOrderMenu[i].quantity);
    }

    for (let i = 0; i < arrOfPrice.length; i++) {
      sum += arrOfPrice[i];
    }
    currentOrder.price = sum;
    currentOrder.servicePrice = sum * (10 / 100);
    currentOrder.totalPrice = sum + (sum * (10 / 100));
    return currentOrder;
  }

  onDeleteTableOrder() {
    this.casherService.isStoring.next(true);
    this.getTableOrderIndex();
    this.casherService.deleteTableOrder(this.getTableOrderIndex());
    return this.dataStorageService.storeOrder().pipe(
      finalize(() => {
        this.casherService.isStoring.next(false);
      })
    ).subscribe(
      (res: any) => {
        this._router.navigate(['/home'])
          .then(() => {
            window.location.reload();
          });
      }
    );
  }

  getTableOrderIndex(): any {
    // let indexOfCurrentTable!: number;
    for (let i = 0; i < this.allOrders.length; i++) {
      if (this.allOrders[i].table === this.currentSelectedTable) {
        return this.indexOfCurrentTable = Number(i);
      }
    }
    this.tableOrder = this.allOrders[this.indexOfCurrentTable]?.orders;
  }
}
