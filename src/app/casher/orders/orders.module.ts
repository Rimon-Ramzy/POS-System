import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/auth/auth.guard';

const router: Routes = [
  { path: '', component: OrdersComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(router)
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
