import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashersDataService {
  casher: any[] = [];
  casherChanged = new BehaviorSubject<any[]>([]);

  constructor() { }
  setCasher(casher: any) {
    this.casher = casher;
    this.casherChanged.next(this.casher);
  }

  getCasher() {
    return this.casher;
  }

  addNewCasher(newCasher: any) {
    console.log(newCasher);
    console.log(this.casher);
    console.log(this.casher);
    this.casher.push(newCasher);
    this.casherChanged.next(this.casher);
  }

  removeCasher(index: number) {
    this.casher.splice(index, 1)
    this.casherChanged.next(this.casher);
    console.log(this.casher);
  }
}
