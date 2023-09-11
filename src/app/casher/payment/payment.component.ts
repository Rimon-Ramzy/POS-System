import { Component, OnInit } from '@angular/core';
import { CasherService } from '../casher.service';
import { Payments } from 'src/app/shared/models/payments.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  arrOfPayments: Payments[] = [];
  paymentsPrice: number = 0;
  paymentsTotalPrice: number = 0;

  constructor(private casherService: CasherService) { }

  ngOnInit(): void {
    this.casherService.arrOfPaymentsChanged.subscribe(
      (res: any) => {
        this.arrOfPayments = res;
      }
    )

    this.casherService.paymentsPriceChanged.subscribe(
      (res: any) => {
        this.paymentsPrice = res;
      }
    )

    this.casherService.paymentsTotalPriceChanged.subscribe(
      (res: any) => {
        this.paymentsTotalPrice = res;
      }
    )
  }

}
