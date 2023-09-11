import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentComponent } from './payment.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/auth/auth.guard';

const router: Routes = [
  { path: '', component: PaymentComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    PaymentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(router)
  ],
  exports: [
    PaymentComponent
  ]
})
export class PaymentModule { }
