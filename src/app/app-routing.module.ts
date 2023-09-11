import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('src/app/casher/home/home.module').then(m => m.HomeModule) },
  { path: 'menu', loadChildren: () => import('src/app/casher/menu/menu.module').then(m => m.MenuModule) },
  { path: 'orders', loadChildren: () => import('src/app/casher/orders/orders.module').then(m => m.OrdersModule) },
  { path: 'payment', loadChildren: () => import('src/app/casher/payment/payment.module').then(m => m.PaymentModule) },
  { path: 'settings', loadChildren: () => import('src/app/casher/settings/settings.module').then(m => m.SettingsModule) },
  { path: 'admin', loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule) },
  { path: 'login', loadChildren: () => import('src/app/auth/auth.module').then(m => m.AuthModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
