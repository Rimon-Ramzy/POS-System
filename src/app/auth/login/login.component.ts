import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { AuthResponseData, AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { PlaceholderDirective } from 'src/app/shared/placeholder.directive';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CasherService } from 'src/app/casher/casher.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string | null = null;
  @ViewChild(PlaceholderDirective) alertHost!: PlaceholderDirective;
  private closeSub!: Subscription;

  constructor(private authService: AuthService, private _router: Router, private componentFactoryResolver: ComponentFactoryResolver, private dataStorageService: DataStorageService, private casherService: CasherService) {
  }

  ngOnInit(): void {
    this.dataStorageService.fetchTables().subscribe(
      (respose: number[]) => {
        localStorage.setItem('tableCount', JSON.stringify(respose));
        this.casherService.arrOfTablesChanged.next(respose);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(loginForm: NgForm) {
    if (!loginForm.valid) {
      return;
    }
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    this.authService.login(email, password).subscribe(
      (response: AuthResponseData) => {
        this._router.navigate(['/home']);
        console.log(response);
      },
      (errorRes: any) => {
        this.error = errorRes;
        this.showErrorAlert(errorRes);
      }
    )
    loginForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    const alertComFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    })
  }
}
