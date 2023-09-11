import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentModule } from './payment/payment.module';
import { SettingsModule } from './settings/settings.module';

// const modules = [
//   HomeModule,
//   MenuModule,
//   OrdersModule,
//   PaymentModule,
//   SettingsModule
// ]



@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    // modules
  ],
  exports: [
    // modules
  ]
})
export class CasherModule { }
