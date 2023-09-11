import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { CashersDataService } from 'src/app/auth/cashers-data.service';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.scss']
})
export class DeleteAdminComponent implements OnInit {
  cashers: any[] = []

  constructor(private cashersDataService: CashersDataService, private authService: AuthService) { }

  ngOnInit(): void {
    // console.log(this.cashersDataService. );
    this.authService.fetchAdmin().subscribe(
      (res: any) => {
        this.cashers = res
        console.log(res);
      }
    )

  }

  deleteCasher() {
    //     this._http.delete(`/api/deleteUser/${uid}`)
    //       .subscribe(
    //         () => {
    //           console.log('User deleted successfully.');
    //           // Refresh the user list after deletion
    //           this.fetchUserList();
    //         },
    //         (error) => {
    //           console.error('Error deleting user:', error);
    //         }
    //       );
  }
}
