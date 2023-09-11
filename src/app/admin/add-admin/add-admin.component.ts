import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthResponseData, AuthService } from 'src/app/auth/auth.service';
import { CashersDataService } from 'src/app/auth/cashers-data.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {
  error: string | null = null;

  constructor(private authService: AuthService, private _router: Router, private _http: HttpClient, private casherData: CashersDataService) { }

  ngOnInit(): void {
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    const name = loginForm.value.name;
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    let isAdmin!: boolean;
    console.log(loginForm.value.isAdmin);
    console.log(loginForm.value);

    if (loginForm.value.isAdmin == "admin") {
      isAdmin = true;
    } else {
      isAdmin = false;
    }
    this.authService.signup(email, password).subscribe(
      (response: AuthResponseData) => {
        console.log(response);
        const newCahser = {
          name: name,
          email: email,
          id: response.localId,
          isAdmin: isAdmin,
        }
        this.authService.fetchAdmin().subscribe(
          (res: any) => {
            console.log(res);
            this.casherData.addNewCasher(newCahser);
          }
        )
        this.casherData.casherChanged.subscribe(
          (res: any) => {
            this.authService.storeAdmin(res).subscribe();
          }
        )


      },
      (errorRes: any) => {
        this.error = errorRes;
      }
    )
    loginForm.reset();
  }

}
