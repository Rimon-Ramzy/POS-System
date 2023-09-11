import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';

const routes: any[] = [
  { path: '', component: LoginComponent }
]

@NgModule({
  declarations: [
    LoginComponent,
    VerifyEmailComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
