import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { CasherService } from '../casher.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  arrOfTables: number[] = [];
  isStoring!: boolean;

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    console.log("newwwwww");


    this.casherService.isStoring.next(true);
    this.executeFunctions();
  }

  async executeFunctions(): Promise<void> {
    const dataFromObservableOne = await this.subscribeToObservableOne();
    await this.subscribeToObservableTwo(dataFromObservableOne);
  }

  async subscribeToObservableOne(): Promise<any> {
    return new Promise<any>((resolve) => {
      this.dataStorageService.fetchTables().subscribe(
        (respose: number[]) => {
          this.arrOfTables = respose;
          localStorage.setItem('tableCount', JSON.stringify(respose));
          this.casherService.isStoring.next(false);
        }
      );
    });
  }

  async subscribeToObservableTwo(dataFromObservableOne: any): Promise<void> {
    return new Promise<void>((resolve) => {
      this.casherService.isStoring.subscribe(
        (response: any) => {
          this.isStoring = response
        }
      )
    });
  }

}
