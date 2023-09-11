import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { RouterModule, Routes } from '@angular/router';
import { MenuCardComponent } from './menu-card/menu-card.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/auth/auth.guard';

const router: Routes = [
  { path: '', component: MenuComponent, canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    MenuComponent,
    MenuCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(router)
  ],
  exports: [
    MenuComponent
  ]
})
export class MenuModule { }
