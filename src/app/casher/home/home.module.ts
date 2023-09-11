import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { RouterModule, Routes } from '@angular/router';
import { TablesComponent } from './tables/tables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthGuard } from 'src/app/auth/auth.guard';

const routers: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
]

const component = [
  HomeComponent,
  TablesComponent,
]

@NgModule({
  declarations: [
    component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routers)
  ],
  exports: [
    component,
  ]
})
export class HomeModule { }
