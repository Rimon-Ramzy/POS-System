import { Component, OnInit } from '@angular/core';
import { CasherService } from 'src/app/casher/casher.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-control-table',
  templateUrl: './control-table.component.html',
  styleUrls: ['./control-table.component.scss']
})
export class ControlTableComponent implements OnInit {
  arrOfTables: number[] = [];

  constructor(private casherService: CasherService, private dataStorageService: DataStorageService) { }

  ngOnInit(): void {
    this.casherService.arrOfTablesChanged.subscribe(
      (response: number[]) => {
        this.arrOfTables = response;
      }
    )
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

}
