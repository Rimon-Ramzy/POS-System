import { Component, OnInit } from '@angular/core';
import { CasherService } from 'src/app/casher/casher.service';
import { DataStorageService } from '../data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  arrOfTables: number[] = [];
  term: string = '';
  categoryName: string = 'All Categories';
  users: any[] = [];
  name: string = '';

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.casherService.arrOfTablesChanged.subscribe(
      (response: number[]) => {
        this.arrOfTables = response;
      }
    )

    this.authService.fetchAdmin().subscribe(
      (users) => {
        this.users = users;
        this.authService.user.subscribe(
          (user) => {
            for (let i = 0; i < this.users.length; i++) {
              if ((this.users[i]?.email).toLowerCase() == user?.email) {
                this.name = this.users[i].name;
              }
            }
          }
        )
      }
    )
  }

  openMenu(e: any) {
    console.log(e.target.parentElement.lastChild);
    const menu: any = e.target.parentElement.lastChild
    const line: any = e.target.parentElement.children[1]
    menu.classList.toggle("open")
    line.classList.toggle("open")
  }

  onAddTable() {
    this.casherService.addNewTable(this.arrOfTables.length + 1);
    this.dataStorageService.storeTables().subscribe(
      (res: any) => {
        localStorage.setItem('tableCount', JSON.stringify(res));
        window.location.reload();
      }
    );
  }
  onRemoveTable() {
    const lastIndex = this.casherService.getArrOfTables()[this.casherService.getArrOfTables().length - 2];
    console.log(lastIndex);
    this.casherService.removeTable(lastIndex);
    this.dataStorageService.storeTables().subscribe(
      (res: any) => {
        localStorage.setItem('tableCount', JSON.stringify(res));
        window.location.reload();
      }
    )
  }

  onKeyUp() {
    this.casherService.term.next(this.term);
  }

  getCategoryName(e: any) {
    if (e.target.innerHTML == 'All Categories' ||
      e.target.innerHTML == 'Hot Drinks' ||
      e.target.innerHTML == 'Soft Drinks' ||
      e.target.innerHTML == 'Juices' ||
      e.target.innerHTML == 'Milkshake' ||
      e.target.innerHTML == 'Ice Cream' ||
      e.target.innerHTML == 'Sweet' ||
      e.target.innerHTML == 'Shisha') {
      this.categoryName = e.target.innerHTML;
      this.casherService.termCat.next(e.target.innerHTML);
    }
  }

  logout() {
    this.authService.logout();
  }
}
