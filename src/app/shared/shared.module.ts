import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { TablesComponent } from '../casher/home/tables/tables.component';
import { LoadingComponent } from './loading/loading.component';
import { SearchMenuPipe } from './pipes/search-menu.pipe';
import { SearchMeneByCatPipe } from './pipes/search-mene-by-cat.pipe';
import { AlertComponent } from './alert/alert.component';
import { PlaceholderDirective } from './placeholder.directive';


const component = [
  NavbarComponent,
  SidebarComponent,
  OrderDetailsComponent,
  LoadingComponent,
]

@NgModule({
  declarations: [
    component,
    SearchMenuPipe,
    SearchMeneByCatPipe,
    AlertComponent,
    PlaceholderDirective,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
  ],
  exports: [
    component,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SearchMenuPipe,
    SearchMeneByCatPipe,
  ]
})
export class SharedModule { }
