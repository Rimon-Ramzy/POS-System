import { Component, OnInit } from '@angular/core';
import { CasherService } from './casher/casher.service';
import { DataStorageService } from './shared/data-storage.service';
import { AuthService } from './auth/auth.service';
import { Subscription } from 'rxjs';
import { User } from './auth/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pos-system';
  private userSub!: Subscription;
  isAuthenticated: boolean = false;

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService, private authService: AuthService) {
  }
  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user.subscribe(
      (user: User) => {
        console.log(!user);
        this.isAuthenticated = !!user;
        console.log(this.isAuthenticated);
      }
    )


    this.dataStorageService.fetchOrder().subscribe(
      (response: any) => {
      }
    );

    this.dataStorageService.fetchPayments().subscribe(
      (response: any) => {
      }
    );

    this.dataStorageService.fetchPaymentsTotalPrice().subscribe(
      (response: any) => {
      }
    );

    this.dataStorageService.fetchPaymentsPrice().subscribe(
      (response: any) => {
      }
    );

    // this.authService.fetchAdmin().subscribe(
    //   (response: any) => {
    //   }
    // );


  }
}




