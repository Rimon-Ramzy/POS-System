import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  users: any[] = [];
  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {

    this.authService.fetchAdmin().subscribe(
      (users) => {
        this.users = users;
        this.authService.user.subscribe(
          (user) => {
            for (let i = 0; i < this.users.length; i++) {
              if ((this.users[i]?.email).toLowerCase() == user?.email) {
                this.isAdmin = this.users[i].isAdmin;
              }
            }
          }
        )
      }
    )
  }

}
