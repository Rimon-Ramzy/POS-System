import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CasherService } from '../../casher.service';
import { Subscription, finalize } from 'rxjs';
import { Router } from '@angular/router';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Order } from 'src/app/shared/models/order.model';
import { User } from 'src/app/auth/user.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit, AfterViewInit {
  arrOfTables: number[] = [];
  tableNumListOne: any[] = [];
  tableNumListTwo: any[] = [];
  tableNumListThree: any[] = [];
  tableNumListFour: any[] = [];
  AllHeightOfWrapper: any = 0;
  numberOfGuests?: number;
  updateGuest: boolean = false;
  arrOfAvailableTable: number[] = [];

  @ViewChild('wrapperOne', { read: ElementRef, static: false }) wrapperOne!: ElementRef;
  tableDivHeight: number = 0;

  isAuthenticated: boolean = false;
  private userSub!: Subscription;


  constructor(private casherService: CasherService, private dataStorageService: DataStorageService, private _router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    if (JSON.parse(localStorage.getItem('tableCount')!) == null) {
      this.casherService.arrOfTablesChanged.subscribe(
        (res) => {
          this.arrOfTables = res;
          console.log(res);
        }
      )
    } else {
      this.arrOfTables = JSON.parse(localStorage.getItem('tableCount')!);
    }
    console.log(this.arrOfTables);


    this.handleTables();

    this.userSub = this.authService.user.subscribe(
      (user: User) => {
        // this.isAuthenticated = !user ? false : true;
        this.isAuthenticated = !!user;
        console.log(!user);
        console.log(!!user);
      }
    )
  }

  ngAfterViewInit(): void {
    const divElement = this.wrapperOne.nativeElement;
    const divHeight = divElement.offsetHeight;
    const wrapperTables: any = document.querySelector(".wrapper-tables");
    this.tableDivHeight = divHeight
    wrapperTables.style.height = `${this.tableDivHeight}px`;
    wrapperTables.style.overflow = `hidden`;

    this.getAllOrders()
  }

  firstPartitionBtn() {
    const firstPartitionBtn: any = document.querySelector(".first-partition-btn")
    const secondPartitionBtn: any = document.querySelector(".second-partition-btn")
    const thirdPartitionBtn: any = document.querySelector(".third-partition-btn")
    const fourthPartitionBtn: any = document.querySelector(".fourth-partition-btn")
    const toggleWrapper: any = document.querySelector(".toggle-wrapper")

    if (!firstPartitionBtn.classList.contains("active")) {
      if (secondPartitionBtn.classList.contains("active")) {
        secondPartitionBtn.classList.remove("active")
      } else if (thirdPartitionBtn.classList.contains("active")) {
        thirdPartitionBtn.classList.remove("active")
      } else if (fourthPartitionBtn.classList.contains("active")) {
        fourthPartitionBtn.classList.remove("active");
      }
      firstPartitionBtn.classList.add("active")
      toggleWrapper.style.transform = 'translateY(0%)'
    }
  }

  secondPartitionBtn() {
    const firstPartitionBtn: any = document.querySelector(".first-partition-btn")
    const secondPartitionBtn: any = document.querySelector(".second-partition-btn")
    const thirdPartitionBtn: any = document.querySelector(".third-partition-btn")
    const fourthPartitionBtn: any = document.querySelector(".fourth-partition-btn")
    const toggleWrapper: any = document.querySelector(".toggle-wrapper")

    if (!secondPartitionBtn.classList.contains("active")) {
      if (firstPartitionBtn.classList.contains("active")) {
        firstPartitionBtn.classList.remove("active");
      } else if (thirdPartitionBtn.classList.contains("active")) {
        thirdPartitionBtn.classList.remove("active");
      } else if (fourthPartitionBtn.classList.contains("active")) {
        fourthPartitionBtn.classList.remove("active");
      }
      secondPartitionBtn.classList.add("active");
      toggleWrapper.style.transform = `translateY(-${this.tableDivHeight}px)`
    }
  }

  thirdPartitionBtn() {
    const firstPartitionBtn: any = document.querySelector(".first-partition-btn")
    const secondPartitionBtn: any = document.querySelector(".second-partition-btn")
    const thirdPartitionBtn: any = document.querySelector(".third-partition-btn")
    const fourthPartitionBtn: any = document.querySelector(".fourth-partition-btn")
    const toggleWrapper: any = document.querySelector(".toggle-wrapper")

    if (!thirdPartitionBtn.classList.contains("active")) {
      if (firstPartitionBtn.classList.contains("active")) {
        firstPartitionBtn.classList.remove("active");
      } else if (secondPartitionBtn.classList.contains("active")) {
        secondPartitionBtn.classList.remove("active");
      } else if (fourthPartitionBtn.classList.contains("active")) {
        fourthPartitionBtn.classList.remove("active");
      }
      thirdPartitionBtn.classList.add("active");
      toggleWrapper.style.transform = `translateY(-${this.tableDivHeight * 2}px)`
    }
  }

  fourthPartitionBtn() {
    const firstPartitionBtn: any = document.querySelector(".first-partition-btn")
    const secondPartitionBtn: any = document.querySelector(".second-partition-btn")
    const thirdPartitionBtn: any = document.querySelector(".third-partition-btn")
    const fourthPartitionBtn: any = document.querySelector(".fourth-partition-btn")
    const toggleWrapper: any = document.querySelector(".toggle-wrapper")

    if (!fourthPartitionBtn.classList.contains("active")) {
      if (firstPartitionBtn.classList.contains("active")) {
        firstPartitionBtn.classList.remove("active");
      } else if (secondPartitionBtn.classList.contains("active")) {
        secondPartitionBtn.classList.remove("active");
      } else if (thirdPartitionBtn.classList.contains("active")) {
        thirdPartitionBtn.classList.remove("active");
      }
      fourthPartitionBtn.classList.add("active");
      toggleWrapper.style.transform = `translateY(-${(this.tableDivHeight * 3)}px)`
    }
  }

  onInformation(table: number) {
    this.casherService.selectedNewTable(table);
    this.controlLogic(table);
  }

  handleTables() {
    if (this.arrOfTables?.length > 0 && this.arrOfTables?.length <= 6) {
      for (let i = 0; i < this.arrOfTables.length; i++) {
        this.tableNumListOne.push(this.arrOfTables[i])
      }
    }
    else if (this.arrOfTables?.length > 6 && this.arrOfTables?.length <= 12) {
      for (let i = 0; i < 6; i++) {
        this.tableNumListOne.push(this.arrOfTables[i])
      }
      for (let i = 6; i < this.arrOfTables.length; i++) {
        this.tableNumListTwo.push(this.arrOfTables[i])
      }
    }
    else if (this.arrOfTables?.length > 12 && this.arrOfTables?.length <= 18) {
      for (let i = 0; i < 6; i++) {
        this.tableNumListOne.push(this.arrOfTables[i])
      }
      for (let i = 6; i < this.arrOfTables.length; i++) {
        this.tableNumListTwo.push(this.arrOfTables[i])
      }
      for (let i = 12; i < this.arrOfTables.length; i++) {
        this.tableNumListThree.push(this.arrOfTables[i])
      }
    }
    else if (this.arrOfTables?.length > 18 && this.arrOfTables?.length <= 24) {
      for (let i = 0; i < 6; i++) {
        this.tableNumListOne.push(this.arrOfTables[i])
      }
      for (let i = 6; i < 12; i++) {
        this.tableNumListTwo.push(this.arrOfTables[i])
      }
      for (let i = 12; i < 18; i++) {
        this.tableNumListThree.push(this.arrOfTables[i])
      }
      for (let i = 18; i < this.arrOfTables.length; i++) {
        this.tableNumListFour.push(this.arrOfTables[i])
      }
    };
  }


  onControl(table: number, event: any) {
    const controlBtn: any = event.target;
    const guestsInput: any = controlBtn.parentElement.parentElement.lastChild;
    controlBtn.style.animation = "leaveBtn 3s ease-in-out forwards";
    guestsInput.style.transform = "scalex(1)";
    guestsInput.style.transition = "3s";
    guestsInput.style.transitionDelay = "1.2s";
    this.casherService.selectedNewTable(table);

    this.controlLogic(table);
  }

  controlLogic(table: number) {
    let allOrders: Order[] = this.casherService.getArrOfOrders();
    let indexOfCurrentTable: number;
    for (let i = 0; i < allOrders.length; i++) {
      if (allOrders[i].table === table) {
        indexOfCurrentTable = Number(i);
      }
    }
    allOrders.map(
      (res: any) => {
        if (table == res.table) {
          this.numberOfGuests = res.guest;
          this.casherService.selectedNewTable(table);
          this.casherService.selectedGuestsNum(res.guest);
          this.casherService.ifUpdateOrder(res, true);
        }
      }
    )

    if (this.numberOfGuests !== undefined) {
      this.updateGuest = true;
    }
    else if (this.numberOfGuests == undefined) {
      this.casherService.newObjectOfOrderForCurrentTableChanged.next({})
      this.casherService.ifUpdateOrder({ table: 0, guest: 0, orders: [], price: 0, servicePrice: 0, totalPrice: 0 }, false);
      this.casherService.selectedNewTable(table);
      this.casherService.selectedGuestsNum(0);
      this.updateGuest = false
    }
  }

  onSubmit(table: number, event: any): any {
    const guestsInput: any = event.target.parentElement;
    const controlBtn: any = event.target.parentElement.parentElement.children[1].firstChild;
    controlBtn.style.animation = "backBtn 3.5s ease-in-out forwards";
    guestsInput.style.transform = "scalex(0)"
    guestsInput.style.transition = "1.8s"
    guestsInput.style.transitionDelay = "0.7s"

    if (this.updateGuest) {
      const allOrders: Order[] = this.casherService.getArrOfOrders();
      let indexOfCurrentTable!: number;
      for (let i = 0; i < allOrders.length; i++) {
        if (allOrders[i].table === table) {
          indexOfCurrentTable = Number(i);
        }
      }
      allOrders[indexOfCurrentTable].guest = this.numberOfGuests!;
      this.casherService.selectedGuestsNum(this.numberOfGuests!);
      this.casherService.isStoring.next(true);
      this.casherService.updateOrder(indexOfCurrentTable, allOrders[indexOfCurrentTable]);
      return this.dataStorageService.storeOrder().pipe(
        finalize(() => {
          this.casherService.isStoring.next(false);
        })
      ).subscribe();

    } else {
      this.casherService.selectedGuestsNum(this.numberOfGuests!);
      this.casherService.selectedNewTable(table);
      this._router.navigate(['/menu'])
    }
  }

  onMouseLeave() {
    const controlBtn = document.querySelectorAll('.controlBtn button');
    const guestsInput = document.querySelectorAll('.guests-input');
    controlBtn.forEach(
      (btn: any) => {
        btn.style.animation = "none";
      }
    )
    guestsInput.forEach(
      (btn: any) => {
        btn.style.transform = "scalex(0)"
        btn.style.transition = "none"
        btn.style.transitionDelay = "none"
      }
    )
    this.numberOfGuests = undefined;
  }

  getAllOrders() {
    let allOrders: Order[] = this.casherService.getArrOfOrders();
    this.dataStorageService.fetchOrder().subscribe(
      (response: any) => {
        response?.map(
          (res: any) => {
            this.arrOfAvailableTable.push(res.table)
          }
        )
      }
    );
  }
}
