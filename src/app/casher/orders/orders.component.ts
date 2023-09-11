import { Component, OnInit } from '@angular/core';
import { CasherService } from '../casher.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Observable, Subscription, finalize, from, map, switchMap } from 'rxjs';
import { Order } from 'src/app/shared/models/order.model';
import { Router } from '@angular/router';
import { OrderMenu } from 'src/app/shared/models/order-menu.model';
import { Payments } from 'src/app/shared/models/payments.model';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  arrOfOrders: Order[] = [];
  indexOfCurrentTable!: number;
  currentOrder: any = {}
  arrOfPayments: Payments[] = [];
  arrOfName: string[] = [];

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService, private _router: Router) { }

  ngOnInit(): void {
    this.dataStorageService.fetchOrder().subscribe(
      (res: any) => {
        this.arrOfOrders = res;
      }
    )
    this.casherService.arrOfPaymentsChanged.subscribe(
      (res: any) => {
        this.arrOfPayments = res;
      }
    )
    this.arrOfPayments.map(
      (res: any) => {
        if (this.arrOfPayments?.length != 0) {
          this.arrOfName.push(res.name);
        }
      }
    )
  }

  onCloseOrder(item: Order) {
    this.casherService.isStoring.next(true);
    this.getTableOrderIndex(item.table);
    this.casherService.deleteTableOrder(this.getTableOrderIndex(item.table));
    return this.dataStorageService.storeOrder().pipe(
      finalize(() => {
        this.casherService.isStoring.next(false);
      })
    ).subscribe(
      (res: any) => {
      }
    );
  }


  onEditOrder(item: Order) {
    this.arrOfOrders.map(
      (res: any) => {
        if (item.table == res.table) {
          this.casherService.selectedNewTable(res.table);
          this.casherService.selectedGuestsNum(res.guest);
          this.casherService.ifUpdateOrder(res, true);
        }
      }
    )
    this._router.navigate(['/menu'])
  }

  onPrintOrder() {
    window.print();
  }

  confirm(item: Order) {
    this.casherService.isStoring.next(true);
    const paymentsObj: Payments = {
      name: '',
      quantity: 0,
      totalPrice: 0,
    }

    for (let i = 0; i < item.orders.length; i++) {
      const newPaymentsObj = new Payments(item.orders[i].name, item.orders[i].quantity, item.orders[i].totalPrice);
      if (this.arrOfPayments.length == 0) {
        console.log("this.arrOfPayments.length == 0");
        this.casherService.setArrOfPayments(newPaymentsObj);
        this.arrOfPayments = this.casherService.getArrOfPayments();
        this.casherService.addNewNamePayments(item.orders[i].name);
        this.arrOfName.push(item.orders[i].name)
      } else {
        console.log("this.arrOfPayments.length != 0");

        if (!this.arrOfName.includes(item.orders[i].name)) {
          console.log("not Inc");

          this.casherService.setArrOfPayments(newPaymentsObj);
          this.casherService.addNewNamePayments(item.orders[i].name)
        } else {
          console.log("Inc");

          for (let j = 0; j < this.arrOfPayments.length; j++) {
            if (item.orders[i].name == this.arrOfPayments[j].name) {
              const newQuqntity = item.orders[i].quantity + this.arrOfPayments[j].quantity;
              const newTotalPrice = item.orders[i].totalPrice + this.arrOfPayments[j].totalPrice;
              this.casherService.updateArrOfPayments(j, new Payments(item.orders[i].name, newQuqntity, newTotalPrice))
            }
          }
        }
      }
    }
    this.dataStorageService.storePayments().subscribe();
    this.arrOfOrders[this.getTableOrderIndex(item.table)].isPayed = true;
    this.casherService.updateOrder(this.getTableOrderIndex(item.table), this.arrOfOrders[this.getTableOrderIndex(item.table)])
    this.dataStorageService.storeOrder().pipe(
      finalize(() => {
        this.casherService.isStoring.next(false);
      })
    ).subscribe();

    this.casherService.setPaymentsTotalPrice(this.arrOfOrders[this.getTableOrderIndex(item.table)].totalPrice);
    this.dataStorageService.storePaymentsTotalPrice().subscribe();

    this.casherService.setPaymentsPrice(this.arrOfOrders[this.getTableOrderIndex(item.table)].price);
    this.dataStorageService.storePaymentsPrice().subscribe();
  }

  getCurrentOrder(item: Order) {
    this.currentOrder = item;
  }

  getTableOrderIndex(currentSelectedTable: number): any {
    for (let i = 0; i < this.arrOfOrders.length; i++) {
      if (this.arrOfOrders[i].table === currentSelectedTable) {
        return this.indexOfCurrentTable = Number(i);
      }
    }
  }
}
